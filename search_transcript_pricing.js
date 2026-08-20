const fs = require('fs');
const path = require('path');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\d16be3ab-8725-4152-b4db-c90190b9df95\\.system_generated\\logs\\transcript.jsonl';

async function searchTranscript() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineNum = 0;
  for await (const line of rl) {
    lineNum++;
    try {
      const data = JSON.parse(line);
      if (data.type === 'USER_INPUT' || data.source === 'USER_EXPLICIT') {
        let text = typeof data.content === 'string' ? data.content : JSON.stringify(data.content);
        const lower = text.toLowerCase();
        if (lower.includes('presyo') || 
            lower.includes('pricing') || 
            lower.includes('baba') || 
            lower.includes('tier') || 
            lower.includes('container') || 
            lower.includes('tech giant') ||
            lower.includes('mura') ||
            lower.includes('go signal') ||
            lower.includes('go na') ||
            lower.includes('sige')) {
          console.log(`\n================== Line ${lineNum} [${data.type}] ==================`);
          console.log(text.substring(0, 1000));
        }
      }
    } catch (e) {}
  }
}

searchTranscript();
