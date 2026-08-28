// Client-side Interactive Logic for Linkable AI SaaS Kit Sandbox

document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('promptInput');
  const agentSelect = document.getElementById('agentSelect');
  const runAgentBtn = document.getElementById('runAgentBtn');
  const agentOutput = document.getElementById('agentOutput');

  runAgentBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      alert('Please enter a task prompt for the AI agent.');
      return;
    }

    const agentType = agentSelect.value;
    runAgentBtn.disabled = true;
    runAgentBtn.innerHTML = `<span>Processing Pipeline...</span> <span class="animate-spin">⚙️</span>`;
    agentOutput.textContent = `[INITIATING INFERENCE]\nAgent: ${agentType}\nConnecting to Gemini / Backend Pipeline...`;

    try {
      const res = await fetch('/api/agent/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, agentType })
      });

      const data = await res.json();
      if (data.error) {
        agentOutput.textContent = `❌ Error: ${data.error}\nDetails: ${data.details || 'None'}`;
      } else {
        agentOutput.textContent = `✅ [SUCCESS - ${data.agent.toUpperCase()}]\nModel: ${data.model}\nTimestamp: ${data.timestamp}\n\n${data.output}`;
      }
    } catch (err) {
      agentOutput.textContent = `❌ Network/Client Error: ${err.message}`;
    } finally {
      runAgentBtn.disabled = false;
      runAgentBtn.innerHTML = `<span>Execute Agent Workflow</span> <span>⚡</span>`;
    }
  });
});
