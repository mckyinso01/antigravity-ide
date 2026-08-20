const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\d16be3ab-8725-4152-b4db-c90190b9df95\\.system_generated\\logs\\transcript.jsonl';

async function readDetails() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNum = 0;
  for await (const line of rl) {
    lineNum++;
    if (lineNum >= 1940 && lineNum <= 1970) {
      try {
        const data = JSON.parse(line);
        console.log(`\n================== LINE ${lineNum} [${data.type || data.source}] ==================`);
        let content = typeof data.content === 'string' ? data.content : JSON.stringify(data.content);
        console.log(content.substring(0, 2000));
      } catch (e) {}
    }
  }
}

readDetails();
