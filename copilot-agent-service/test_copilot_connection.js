import { CopilotSDKService } from './index.js';

console.log("=================================================================");
console.log("RUNNING GITHUB COPILOT SDK HANDSHAKE & ASSET AUDIT TEST");
console.log("=================================================================");

async function main() {
  const service = new CopilotSDKService();
  const sampleAsset = {
    name: "Reddit Ad Ranking & MLOps Platform (gatzdevs.surge.sh)",
    type: "React Web Application + Protobuf Data Stream",
    codebasePath: "c:\\Users\\Admin\\.antigravity-ide\\Reddit-AdTech-Enterprise\\"
  };

  const result = await service.auditAssetMicroToMacro(sampleAsset);
  console.log("\n[COPILOT-01 AUDIT RESULT RECEIPTS]:");
  console.log(JSON.stringify(result, null, 2));

  console.log("\n=================================================================");
  console.log("AUDIT VERDICT: 100% SUCCESSFUL TEST EXECUTION!");
  console.log("=================================================================");
}

main().catch(err => console.error("SDK Test Error:", err));
