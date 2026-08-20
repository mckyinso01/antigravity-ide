const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\d16be3ab-8725-4152-b4db-c90190b9df95\\.system_generated\\logs\\transcript.jsonl';

async function readRange() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNum = 0;
  for await (const line of rl) {
    lineNum++;
    if (lineNum >= 1500 && lineNum < 2200) {
      try {
        const data = JSON.parse(line);
        if (data.type === 'USER_INPUT' || data.source === 'USER_EXPLICIT') {
          console.log(`\n================== LINE ${lineNum} [USER_INPUT] ==================`);
          console.log(data.content);
        }
      } catch (e) {}
    }
  }
}

readRange();
