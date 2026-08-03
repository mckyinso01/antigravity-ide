#!/usr/bin/env node
/**
 * scripts/parse_code_with_acorn.js
 * Batch JS parse helper using acorn.
 * Input (stdin): either a JSON array of code strings OR raw code string.
 * Output (stdout): JSON array of results [{ ok: true } | { ok: false, error: "..." }, ...]
 * Usage: echo '[ "code1", "code2" ]' | node scripts/parse_code_with_acorn.js
 */

function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", chunk => data += chunk);
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", err => reject(err));
  });
}

(async () => {
  try {
    const raw = (await readStdin()).trim();
    if (!raw) {
      console.log(JSON.stringify([]));
      process.exit(0);
    }

    let acorn;
    try {
      acorn = require("acorn");
    } catch (e) {
      console.log(JSON.stringify([{ ok: false, error: "acorn module not installed in node_modules" }]));
      process.exit(0);
    }

    let inputs;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        inputs = parsed.map(s => (typeof s === "string" ? s : String(s)));
      } else {
        inputs = [String(parsed)];
      }
    } catch (e) {
      inputs = [raw];
    }

    const results = inputs.map(code => {
      try {
        acorn.parse(code, { ecmaVersion: 2020, sourceType: "module" });
        return { ok: true };
      } catch (err) {
        return { ok: false, error: String(err && err.message ? err.message : err) };
      }
    });

    console.log(JSON.stringify(results));
    process.exit(0);
  } catch (err) {
    console.error(JSON.stringify({ ok: false, error: String(err) }));
    process.exit(1);
  }
})();
