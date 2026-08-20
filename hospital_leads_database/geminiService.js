const path = require('path');
const fs = require('fs');

// Load environment variables if .env exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    }
  });
}

const API_KEY = process.env.GEMINI_API_KEY || "";
const MODEL = process.env.DEFAULT_GEMINI_MODEL || "gemini-3.6-flash";

/**
 * Call Gemini 3.6 Flash API with a custom system prompt and user content
 */
async function queryGemini(prompt, systemInstruction = "You are the LinkableAI Enterprise Intelligence Engine.") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  
  const payload = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ],
    systemInstruction: {
      parts: [
        { text: systemInstruction }
      ]
    },
    generationConfig: {
      temperature: 0.2,
      maxOutputTokens: 1024
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      console.error("Gemini API Output:", JSON.stringify(data));
      return null;
    }
  } catch (error) {
    console.error("Gemini Service Network Error:", error);
    return null;
  }
}

/**
 * Classifies an incoming prospect reply into a structured intent
 */
async function classifyInboundReply(fromEmail, subject, emailBody) {
  const systemPrompt = `You are LinkableAI's Inbound Reply Intelligence. Analyze this prospect email and return ONLY a valid JSON object (no markdown quotes) with:
{
  "intent": "DEMO_REQUEST" | "PRICING_INQUIRY" | "TECHNICAL_QUESTION" | "NOT_INTERESTED" | "BOUNCE_AUTO_REPLY",
  "urgency": "HIGH" | "MEDIUM" | "LOW",
  "summary": "1-sentence executive summary",
  "suggestedAction": "1-sentence next step"
}`;

  const prompt = `From: ${fromEmail}\nSubject: ${subject}\nBody:\n${emailBody}`;
  const response = await queryGemini(prompt, systemPrompt);
  
  try {
    const cleaned = response.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    return {
      intent: "GENERAL_INQUIRY",
      urgency: "MEDIUM",
      summary: response || "Incoming message received.",
      suggestedAction: "Founder review recommended."
    };
  }
}

/**
 * Drafts an executive reply from Founder Mharc Gatan
 */
async function draftFounderReply(prospectName, hospitalName, inquiryBody) {
  const systemPrompt = `You are Mharc Gatan, Founder & AI Systems Architect of LinkableAI (mharcgatan@linkable.it.com).
Write a professional, warm, concise executive response to a hospital leader or B2B executive.
Keep it under 120 words. Focus on solving their immediate need, offering a 10-minute live demonstration of our Clinical OS (https://clinical.linkable.it.com), and highlighting our zero-downtime deployment. Sign off as Mharc Gatan, Founder & AI Systems Architect, LinkableAI.`;

  const prompt = `Prospect: ${prospectName}\nOrganization: ${hospitalName}\nTheir Message:\n${inquiryBody}`;
  return await queryGemini(prompt, systemPrompt);
}

module.exports = {
  queryGemini,
  classifyInboundReply,
  draftFounderReply
};
