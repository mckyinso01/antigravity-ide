/**
 * Dynamic Data Importer
 * Accepts CSV, Excel (.xlsx/.xls), or JSON files.
 * Auto-detects format, parses, previews, maps columns to Dexie tables,
 * and imports with optional wipe-and-replace.
 */
import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, FileJson, Table, CheckCircle2, AlertTriangle, Loader2, Database, RefreshCw } from "lucide-react";
import { DESIGN_TOKENS } from "@/lib/designSystem";
import { db, entities } from "@/lib/db";
import { sanitizeImportKeys } from "@/lib/security/validators";

// ─── Table schema definitions for auto-mapping ────────────────────────────
const TABLE_SCHEMAS = {
  products: {
    label: "Products",
    icon: "📦",
    fields: ["name", "sku", "barcode", "category_id", "supplier_id", "cost", "price", "quantity", "low_stock_threshold", "status"],
    required: ["name"],
  },
  categories: {
    label: "Categories",
    icon: "🏷️",
    fields: ["name", "status"],
    required: ["name"],
  },
  suppliers: {
    label: "Suppliers",
    icon: "🚚",
    fields: ["name", "status"],
    required: ["name"],
  },
  customers: {
    label: "Customers",
    icon: "👤",
    fields: ["name", "phone", "email", "loyalty_points", "status"],
    required: ["name"],
  },
  transactions: {
    label: "Transactions",
    icon: "🧾",
    fields: ["transaction_number", "type", "status", "payment_method", "total_amount", "customer_name"],
    required: ["transaction_number"],
  },
  stockAdjustments: {
    label: "Stock Adjustments",
    icon: "📋",
    fields: ["product_id", "quantity", "reason", "status"],
    required: ["product_id"],
  },
  recipes: {
    label: "Recipes",
    icon: "👨‍🍳",
    fields: ["name", "product_id", "status"],
    required: ["name"],
  },
  purchaseOrders: {
    label: "Purchase Orders",
    icon: "🛒",
    fields: ["supplier_id", "status", "total_amount"],
    required: ["supplier_id"],
  },
  stockAlerts: {
    label: "Stock Alerts",
    icon: "🔔",
    fields: ["product_id", "product_name", "alert_type", "status", "message"],
    required: ["product_id"],
  },
  priceHistory: {
    label: "Price History",
    icon: "📈",
    fields: ["product_id", "old_price", "new_price"],
    required: ["product_id"],
  },
};

// ─── Fuzzy column name matching ─────────────────────────────────────────────
function normalizeCol(name) {
  return String(name).toLowerCase().trim().replace(/[\s_\-]+/g, "");
}

function autoMapColumn(colName, tableFields) {
  const normalized = normalizeCol(colName);
  // Direct match
  for (const field of tableFields) {
    if (normalizeCol(field) === normalized) return field;
  }
  // Partial / alias matching
  const aliases = {
    productname: "name", itemname: "name", item: "name", product: "name", description: "name",
    sku: "sku", code: "sku", itemcode: "sku", productcode: "sku",
    barcode: "barcode", upc: "barcode", ean: "barcode",
    category: "category_id", cat: "category_id", categoryid: "category_id", categoryname: "category_id",
    supplier: "supplier_id", vendor: "supplier_id", supplierid: "supplier_id", vendorname: "supplier_id",
    cost: "cost", unitcost: "cost", purchasecost: "cost",
    price: "price", sellingprice: "price", retailprice: "price", unitprice: "price",
    qty: "quantity", stock: "quantity", onhand: "quantity", quantityonhand: "quantity", inventory: "quantity",
    lowstock: "low_stock_threshold", reorderpoint: "low_stock_threshold", minstock: "low_stock_threshold",
    status: "status", activestatus: "status",
    phone: "phone", mobile: "phone", contact: "phone", phonenumber: "phone",
    email: "email", emailaddress: "email",
    loyaltypoints: "loyalty_points", points: "loyalty_points",
    txnnumber: "transaction_number", receiptnumber: "transaction_number", txnid: "transaction_number", invoice: "transaction_number", invoicenumber: "transaction_number",
    type: "type", transactiontype: "type",
    paymentmethod: "payment_method", payment: "payment_method", tender: "payment_method",
    amount: "total_amount", total: "total_amount", totalamount: "total_amount", saleamount: "total_amount",
    customer: "customer_name", customername: "customer_name", buyer: "customer_name",
    reason: "reason", adjustmentreason: "reason",
    alerttype: "alert_type", alert: "alert_type",
    message: "message", alertmessage: "message",
    oldprice: "old_price", previousprice: "old_price",
    newprice: "new_price", currentprice: "new_price",
  };
  if (aliases[normalized]) {
    for (const field of tableFields) {
      if (field === aliases[normalized]) return field;
    }
  }
  return null;
}

// ─── File parsing ─────────────────────────────────────────────────────────────
async function parseFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "json" || file.type === "application/json") {
    const text = await file.text();
    const data = JSON.parse(text);
    // If it's an object with entity keys (backup format), return as multi-table
    if (!Array.isArray(data)) {
      const knownTables = Object.keys(TABLE_SCHEMAS);
      const matchingKeys = Object.keys(data).filter(k =>
        knownTables.includes(k.toLowerCase()) || knownTables.includes(k.toLowerCase().replace(/s$/, ""))
      );
      if (matchingKeys.length > 0) {
        return { type: "multitable", data };
      }
    }
    // Flat array
    const rows = Array.isArray(data) ? data : [data];
    return { type: "flat", rows, headers: rows.length > 0 ? Object.keys(rows[0]) : [] };
  }

  if (ext === "csv" || file.type === "text/csv") {
    const Papa = (await import("papaparse")).default;
    const text = await file.text();
    return new Promise((resolve) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve({
            type: "flat",
            rows: results.data,
            headers: results.meta.fields || [],
          });
        },
      });
    });
  }

  if (ext === "xlsx" || ext === "xls" || file.type.includes("spreadsheet")) {
    const XLSX = await import("xlsx");
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    // If multiple sheets, return as multi-table
    if (workbook.SheetNames.length > 1) {
      const sheets = {};
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      }
      return { type: "multitable", data: sheets };
    }
    // Single sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
    return { type: "flat", rows, headers: rows.length > 0 ? Object.keys(rows[0]) : [] };
  }

  throw new Error(`Unsupported file format: .${ext}. Please upload CSV, Excel (.xlsx/.xls), or JSON.`);
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function DynamicDataImporter() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [parseResult, setParseResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTable, setSelectedTable] = useState("products");
  const [columnMap, setColumnMap] = useState({});
  const [wipeExisting, setWipeExisting] = useState(true);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);
  const fileInputRef = useRef(null);

  const reset = () => {
    setFile(null);
    setParseResult(null);
    setError(null);
    setColumnMap({});
    setImportResult(null);
  };

  const handleFile = useCallback(async (selectedFile) => {
    reset();
    setFile(selectedFile);
    setParsing(true);
    try {
      const result = await parseFile(selectedFile);
      setParseResult(result);

      // Auto-detect best table and map columns
      if (result.type === "flat") {
        const schema = TABLE_SCHEMAS[selectedTable];
        const mapping = {};
        for (const header of result.headers) {
          mapping[header] = autoMapColumn(header, schema.fields);
        }
        setColumnMap(mapping);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setParsing(false);
    }
  }, [selectedTable]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleTableChange = (tableName) => {
    setSelectedTable(tableName);
    setImportResult(null);
    if (parseResult?.type === "flat") {
      const schema = TABLE_SCHEMAS[tableName];
      const mapping = {};
      for (const header of parseResult.headers) {
        mapping[header] = autoMapColumn(header, schema.fields);
      }
      setColumnMap(mapping);
    }
  };

  const handleMultiTableImport = async () => {
    setImporting(true);
    setError(null);
    try {
      const results = {};
      for (const [sheetName, rows] of Object.entries(parseResult.data)) {
        // Match sheet name to a known table
        const tableName = Object.keys(TABLE_SCHEMAS).find(t =>
          normalizeCol(t) === normalizeCol(sheetName) ||
          normalizeCol(t.replace(/s$/, "")) === normalizeCol(sheetName) ||
          normalizeCol(TABLE_SCHEMAS[t].label) === normalizeCol(sheetName)
        );
        if (!tableName || !Array.isArray(rows) || rows.length === 0) {
          results[sheetName] = { skipped: true, reason: "Unrecognized table name or empty" };
          continue;
        }
        const schema = TABLE_SCHEMAS[tableName];
        const mapping = {};
        const headers = rows.length > 0 ? Object.keys(rows[0]) : [];
        for (const header of headers) {
          mapping[header] = autoMapColumn(header, schema.fields);
        }
        const records = rows.map(row => {
          const record = {};
          for (const [header, field] of Object.entries(mapping)) {
            if (field && row[header] !== undefined && row[header] !== "") {
              record[field] = row[header];
            }
          }
          return record;
        }).filter(r => schema.required.every(req => r[req]));

        if (wipeExisting) {
          await db.table(tableName).clear();
        }
        const sanitized = sanitizeImportKeys(records);
        const now = new Date().toISOString();
        const withTimestamps = sanitized.map(r => ({
          ...r,
          id: r.id || crypto.randomUUID(),
          created_date: r.created_date || now,
          updated_date: now,
        }));
        await db.table(tableName).bulkAdd(withTimestamps);
        results[sheetName] = { imported: withTimestamps.length, table: tableName };
      }
      setImportResult({ multiTable: true, results });
    } catch (err) {
      setError(`Import failed: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleFlatImport = async () => {
    setImporting(true);
    setError(null);
    try {
      const schema = TABLE_SCHEMAS[selectedTable];
      const records = parseResult.rows.map(row => {
        const record = {};
        for (const [header, field] of Object.entries(columnMap)) {
          if (field && row[header] !== undefined && row[header] !== "") {
            record[field] = row[header];
          }
        }
        return record;
      }).filter(r => schema.required.every(req => r[req] !== undefined && r[req] !== ""));

      if (records.length === 0) {
        setError(`No valid records found. Required field(s): ${schema.required.join(", ")}`);
        setImporting(false);
        return;
      }

      if (wipeExisting) {
        await db.table(selectedTable).clear();
      }

      const sanitized = sanitizeImportKeys(records);
      const now = new Date().toISOString();
      const withTimestamps = sanitized.map(r => ({
        ...r,
        id: r.id || crypto.randomUUID(),
        created_date: r.created_date || now,
        updated_date: now,
      }));
      await db.table(selectedTable).bulkAdd(withTimestamps);

      setImportResult({
        multiTable: false,
        imported: withTimestamps.length,
        table: selectedTable,
        tableLabel: schema.label,
      });
    } catch (err) {
      setError(`Import failed: ${err.message}`);
    } finally {
      setImporting(false);
    }
  };

  const handleImport = () => {
    if (parseResult?.type === "multitable") {
      handleMultiTableImport();
    } else {
      handleFlatImport();
    }
  };

  const isMultiTable = parseResult?.type === "multitable";
  const flatRows = parseResult?.type === "flat" ? parseResult.rows : [];
  const previewRows = flatRows.slice(0, 5);
  const schema = TABLE_SCHEMAS[selectedTable];

  return (
    <Card className="water-breathing-card border border-slate-800/80 bg-[#0B1C30]/90 shadow-xl rounded-2xl app-card-hover">
      <CardHeader className="pb-2 border-b border-slate-800/80">
        <CardTitle className="text-base font-bold text-white flex items-center gap-2.5">
          <Database className="w-4 h-4 text-cyan-400" />
          Dynamic Data Importer
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <p className="text-xs text-slate-300 font-sans leading-relaxed">
          Upload your real inventory, sales, or audit records in any format — CSV, Excel (.xlsx/.xls), or JSON.
          The system auto-detects the format, previews the data, maps columns, and replaces the demo data with your real records.
        </p>

        {/* Drop Zone */}
        {!file && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
              dragOver
                ? "border-cyan-400 bg-cyan-950/30 scale-[1.02]"
                : "border-slate-700 hover:border-cyan-500/50 hover:bg-[#071322]"
            }`}
          >
            <Upload className={`w-10 h-10 mx-auto mb-3 ${dragOver ? "text-cyan-400" : "text-slate-500"}`} />
            <p className="text-sm font-bold text-slate-200 mb-1">Drop your file here or click to browse</p>
            <p className="text-[11px] text-slate-500 font-mono">CSV · Excel (.xlsx, .xls) · JSON</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls,.json,text/csv,application/json,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              className="hidden"
              onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
            />
          </div>
        )}

        {/* Parsing state */}
        {parsing && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#071322] border border-slate-800">
            <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
            <span className="text-xs text-slate-300 font-mono">Parsing {file?.name}…</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-rose-300">Import Error</p>
              <p className="text-[11px] text-slate-400 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* File info + parsed result */}
        {file && !parsing && !error && parseResult && (
          <div className="space-y-4">
            {/* File badge */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#071322] border border-slate-800">
              <div className="flex items-center gap-2.5">
                {file.name.endsWith(".json") ? (
                  <FileJson className="w-5 h-5 text-amber-400" />
                ) : file.name.match(/\.xlsx?$/) ? (
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Table className="w-5 h-5 text-cyan-400" />
                )}
                <div>
                  <p className="text-xs font-bold text-white">{file.name}</p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {isMultiTable
                      ? `Multi-table: ${Object.keys(parseResult.data).length} sheets`
                      : `${flatRows.length} rows · ${parseResult.headers.length} columns`}
                  </p>
                </div>
              </div>
              <Button variant="ghost" className="text-xs text-slate-400 hover:text-rose-400" onClick={reset}>
                Remove
              </Button>
            </div>

            {/* Multi-table info */}
            {isMultiTable && (
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/30">
                <p className="text-xs text-emerald-300 font-bold mb-2">Detected multi-table file (backup format or multi-sheet Excel)</p>
                <div className="space-y-1">
                  {Object.entries(parseResult.data).map(([sheet, rows]) => (
                    <div key={sheet} className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-300">{sheet}</span>
                      <span className="text-slate-500">{Array.isArray(rows) ? rows.length : 0} rows</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Table selector (flat only) */}
            {!isMultiTable && (
              <div>
                <label className={DESIGN_TOKENS.forms.label}>Target Table</label>
                <select
                  className={DESIGN_TOKENS.forms.select + " w-full"}
                  value={selectedTable}
                  onChange={(e) => handleTableChange(e.target.value)}
                >
                  {Object.entries(TABLE_SCHEMAS).map(([key, val]) => (
                    <option key={key} value={key}>{val.icon} {val.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Column mapping (flat only) */}
            {!isMultiTable && previewRows.length > 0 && (
              <div>
                <label className={DESIGN_TOKENS.forms.label}>Column Mapping</label>
                <div className="space-y-1.5 max-h-56 overflow-y-auto">
                  {parseResult.headers.map(header => (
                    <div key={header} className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 w-1/3 truncate" title={header}>{header}</span>
                      <span className="text-slate-600 text-xs">→</span>
                      <select
                        className={DESIGN_TOKENS.forms.select + " flex-1 text-[11px] py-1.5"}
                        value={columnMap[header] || ""}
                        onChange={(e) => setColumnMap(prev => ({ ...prev, [header]: e.target.value || null }))}
                      >
                        <option value="">— Skip —</option>
                        {schema.fields.map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preview table (flat only) */}
            {!isMultiTable && previewRows.length > 0 && (
              <div>
                <label className={DESIGN_TOKENS.forms.label}>Preview (first 5 rows)</label>
                <div className="overflow-x-auto rounded-xl border border-slate-800 max-h-56">
                  <table className="w-full text-[11px] font-mono">
                    <thead className="bg-[#071322] sticky top-0">
                      <tr>
                        {parseResult.headers.map(h => (
                          <th key={h} className="px-2 py-1.5 text-left text-slate-400 font-bold whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows.map((row, i) => (
                        <tr key={i} className="border-t border-slate-800/50">
                          {parseResult.headers.map(h => (
                            <td key={h} className="px-2 py-1.5 text-slate-300 whitespace-nowrap max-w-[120px] truncate">
                              {String(row[h] ?? "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Wipe option */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#071322] border border-slate-800">
              <div>
                <div className="text-xs font-bold text-white font-sans">Wipe existing data before import</div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">Clears all current records in the target table(s)</div>
              </div>
              <input
                type="checkbox"
                checked={wipeExisting}
                onChange={(e) => setWipeExisting(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
              />
            </div>

            {/* Import button */}
            <Button
              onClick={handleImport}
              disabled={importing}
              className={DESIGN_TOKENS.buttons.primary + " w-full gap-2 text-xs font-bold py-2.5"}
            >
              {importing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importing…
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  {wipeExisting ? "Wipe & Import" : "Import Data"}
                </>
              )}
            </Button>
          </div>
        )}

        {/* Import result */}
        {importResult && !importing && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs font-bold text-emerald-300">Import Successful</p>
              {importResult.multiTable ? (
                <div className="mt-2 space-y-1">
                  {Object.entries(importResult.results).map(([sheet, res]) => (
                    <p key={sheet} className="text-[11px] font-mono text-slate-400">
                      {sheet}: {res.skipped ? `⚠ Skipped (${res.reason})` : `✅ ${res.imported} rows → ${res.table}`}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  {importResult.imported} records imported into {importResult.tableLabel}
                </p>
              )}
              <Button
                variant="ghost"
                className="text-xs text-cyan-400 hover:text-cyan-300 mt-2 p-0 h-auto"
                onClick={reset}
              >
                Import another file →
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
