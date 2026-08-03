#!/usr/bin/env node
/**
 * scripts/parse_code_with_acorn.js
 * Reads JS code from stdin, attempts to parse with acorn, and returns JSON:
 * { ok: true } or { ok: false, error: "message" }
 *
 * Usage: node scripts/parse_code_with_acorn.js < code.js
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

readStdin().then(code => {
  let acorn;
  try {
    acorn = require("acorn");
  } catch (e) {
    console.log(JSON.stringify({ ok: false, error: "acorn module not installed in node_modules" }));
    process.exit(0);
  }

  try {
    acorn.parse(code, { ecmaVersion: 2020, sourceType: "module" });
    console.log(JSON.stringify({ ok: true }));
    process.exit(0);
  } catch (e) {
    console.log(JSON.stringify({ ok: false, error: String(e.message || e) }));
    process.exit(0);
  }
}).catch(err => {
  console.log(JSON.stringify({ ok: false, error: String(err) }));
  process.exit(1);
});
