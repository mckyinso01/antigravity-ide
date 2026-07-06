// State Management
let token = localStorage.getItem('hf_token') || '';
let selectedFile = null;
let generatedFiles = {
  plan: '',
  html: '',
  css: '',
  js: '',
  review: '',
  marketing: ''
};

// Model Configurations
const modelLists = {
  chat: [
    { name: 'Llama 3.3 70B Instruct', id: 'meta-llama/Llama-3.3-70B-Instruct' },
    { name: 'Qwen 2.5 72B Instruct', id: 'Qwen/Qwen2.5-72B-Instruct' },
    { name: 'Mistral 7B Instruct v0.3', id: 'mistralai/Mistral-7B-Instruct-v0.3' },
    { name: 'Custom Model...', id: 'custom' }
  ],
  'text-to-image': [
    { name: 'FLUX.1-schnell (Fast, High Quality)', id: 'black-forest-labs/FLUX.1-schnell' },
    { name: 'Stable Diffusion XL 1.0', id: 'stabilityai/stable-diffusion-xl-base-1.0' },
    { name: 'Stable Diffusion v1.5', id: 'runwayml/stable-diffusion-v1-5' },
    { name: 'Custom Model...', id: 'custom' }
  ],
  'text-to-speech': [
    { name: 'MMS TTS English (Facebook)', id: 'facebook/mms-tts-eng' },
    { name: 'Bark Small (Expressive)', id: 'suno/bark-small' },
    { name: 'Custom Model...', id: 'custom' }
  ],
  'image-classification': [
    { name: 'ViT Base (Vision Transformer)', id: 'google/vit-base-patch16-224' },
    { name: 'DETR ResNet-50 (Object Detection)', id: 'facebook/detr-resnet-50' },
    { name: 'Custom Model...', id: 'custom' }
  ]
};

// DOM Elements
const elements = {
  // Navigation
  navAgentBuilder: document.getElementById('nav-agent-builder'),
  navPlayground: document.getElementById('nav-playground'),
  navSettings: document.getElementById('nav-settings'),
  tabAgentBuilder: document.getElementById('tab-agent-builder'),
  tabPlayground: document.getElementById('tab-playground'),
  tabSettings: document.getElementById('tab-settings'),
  currentTabTitle: document.getElementById('current-tab-title'),
  currentTabSubtitle: document.getElementById('current-tab-subtitle'),
  
  // Status Bar
  statusDot: document.getElementById('status-dot'),
  statusText: document.getElementById('status-text'),
  btnQuickCheckToken: document.getElementById('btn-quick-check-token'),
  
  // Settings Panel
  inputToken: document.getElementById('settings-token-input'),
  settingsStatusBox: document.getElementById('settings-status-box'),
  settingsStatusIcon: document.getElementById('settings-status-icon'),
  settingsStatusTitle: document.getElementById('settings-status-title'),
  settingsStatusDesc: document.getElementById('settings-status-desc'),
  btnSaveSettings: document.getElementById('btn-save-settings'),
  
  // Playground Panel
  selectPlayTask: document.getElementById('select-play-task'),
  selectPlayModel: document.getElementById('select-play-model'),
  inputCustomModel: document.getElementById('input-custom-model'),
  customModelContainer: document.getElementById('custom-model-container'),
  inputsChat: document.getElementById('inputs-chat'),
  inputsImage: document.getElementById('inputs-image'),
  inputsTts: document.getElementById('inputs-tts'),
  inputsClassification: document.getElementById('inputs-classification'),
  playChatPrompt: document.getElementById('play-chat-prompt'),
  playImagePrompt: document.getElementById('play-image-prompt'),
  playTtsPrompt: document.getElementById('play-tts-prompt'),
  uploadImageFile: document.getElementById('upload-image-file'),
  uploadedImagePreview: document.getElementById('uploaded-image-preview'),
  uploadedImagePreviewContainer: document.getElementById('uploaded-image-preview-container'),
  dropzone: document.getElementById('dropzone'),
  btnRunPlayground: document.getElementById('btn-run-playground'),
  playgroundLoader: document.getElementById('playground-loader'),
  playgroundOutputArea: document.getElementById('playground-output-area'),
  
  // Playground outputs
  playOutChat: document.getElementById('play-out-chat'),
  chatThreadContainer: document.getElementById('chat-thread-container'),
  playOutImage: document.getElementById('play-out-image'),
  playOutImg: document.getElementById('play-out-img'),
  imgPlaceholder: document.getElementById('img-placeholder'),
  imageActionButtons: document.getElementById('image-action-buttons'),
  btnDownloadImage: document.getElementById('btn-download-image'),
  playOutTts: document.getElementById('play-out-tts'),
  audioPlaceholder: document.getElementById('audio-placeholder'),
  audioPlayerWrapper: document.getElementById('audio-player-wrapper'),
  playOutAudio: document.getElementById('play-out-audio'),
  playOutClassification: document.getElementById('play-out-classification'),
  classPlaceholder: document.getElementById('class-placeholder'),
  classificationResultsWrapper: document.getElementById('classification-results-wrapper'),
  
  // Multi-Agent panel
  selectPlanner: document.getElementById('select-planner'),
  selectUiux: document.getElementById('select-uiux'),
  selectCoder: document.getElementById('select-coder'),
  selectReviewer: document.getElementById('select-reviewer'),
  selectMarketing: document.getElementById('select-marketing'),
  appPrompt: document.getElementById('app-prompt'),
  btnStartPipeline: document.getElementById('btn-start-pipeline'),
  pipelineLoader: document.getElementById('pipeline-loader'),
  pipelineExports: document.getElementById('pipeline-exports'),
  btnCopyCode: document.getElementById('btn-copy-code'),
  btnDownloadZip: document.getElementById('btn-download-zip'),
  
  // Timeline nodes
  timePlanner: document.getElementById('time-planner'),
  timeUiux: document.getElementById('time-uiux'),
  timeCoder: document.getElementById('time-coder'),
  timeReviewer: document.getElementById('time-reviewer'),
  timeMarketing: document.getElementById('time-marketing'),
  
  // Output tabs
  prePlanner: document.getElementById('out-planner-pre'),
  preHtml: document.getElementById('out-html-pre'),
  preCss: document.getElementById('out-css-pre'),
  preJs: document.getElementById('out-js-pre'),
  preReview: document.getElementById('out-review-pre'),
  preMarketing: document.getElementById('out-marketing-pre'),
  toastContainer: document.getElementById('toast-container')
};

// Initialize App
function init() {
  // Set initial token value
  if (token) {
    elements.inputToken.value = token;
    verifyTokenSilently();
  } else {
    updateStatusIndicator(false, 'HF Key: Missing');
  }

  setupEventListeners();
  populatePlaygroundModels();
}

// Toast Utility
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-triangle-exclamation';
  
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  elements.toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Navigation & Tab Switching
function setupEventListeners() {
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');
      
      // Update sidebar state
      document.querySelectorAll('.menu-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      
      // Update pane state
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      document.getElementById(targetTab).classList.add('active');
      
      // Update title text
      if (targetTab === 'tab-agent-builder') {
        elements.currentTabTitle.textContent = 'Multi-Agent Builder';
        elements.currentTabSubtitle.textContent = 'Coordinate collaborative agents to build complete layouts and code files for free.';
      } else if (targetTab === 'tab-playground') {
        elements.currentTabTitle.textContent = 'Single Model Playground';
        elements.currentTabSubtitle.textContent = 'Quickly test individual Hugging Face endpoints for chat, vision, images, or audio.';
      } else if (targetTab === 'tab-settings') {
        elements.currentTabTitle.textContent = 'Settings & Config';
        elements.currentTabSubtitle.textContent = 'Configure your Hugging Face Authentication Token and test connection.';
      }
    });
  });

  // Settings Save Button
  elements.btnSaveSettings.addEventListener('click', () => {
    const rawVal = elements.inputToken.value.trim();
    if (!rawVal) {
      showToast('Token cannot be empty.', 'error');
      return;
    }
    token = rawVal;
    localStorage.setItem('hf_token', token);
    verifyToken(true);
  });

  elements.btnQuickCheckToken.addEventListener('click', () => {
    if (!token) {
      showToast('No token configured. Go to Settings.', 'error');
      return;
    }
    verifyToken(false);
  });

  // Playground task change
  elements.selectPlayTask.addEventListener('change', () => {
    populatePlaygroundModels();
    togglePlaygroundInputs();
  });

  // Playground model change (detect Custom option)
  elements.selectPlayModel.addEventListener('change', () => {
    if (elements.selectPlayModel.value === 'custom') {
      elements.customModelContainer.classList.remove('hidden');
    } else {
      elements.customModelContainer.classList.add('hidden');
    }
  });

  // Drag and drop for image upload
  elements.dropzone.addEventListener('click', () => elements.uploadImageFile.click());
  elements.dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    elements.dropzone.style.borderColor = 'var(--accent-purple)';
  });
  elements.dropzone.addEventListener('dragleave', () => {
    elements.dropzone.style.borderColor = 'var(--glass-border)';
  });
  elements.dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    elements.dropzone.style.borderColor = 'var(--glass-border)';
    if (e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  });
  elements.uploadImageFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  });

  // Run Inference button
  elements.btnRunPlayground.addEventListener('click', runPlaygroundInference);

  // Multi-agent tabs toggle
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const targetPre = btn.getAttribute('data-output');
      document.querySelectorAll('.code-view').forEach(pre => pre.classList.remove('active'));
      document.getElementById(`${targetPre}-pre`).classList.add('active');
    });
  });

  // Start Multi-agent pipeline
  elements.btnStartPipeline.addEventListener('click', startMultiAgentPipeline);
  
  // Copy and download generated project files
  elements.btnCopyCode.addEventListener('click', copyProjectFiles);
  elements.btnDownloadZip.addEventListener('click', downloadProjectFiles);
}

// Token Verification
async function verifyToken(showSuccessToast = false) {
  if (!token) {
    updateStatusIndicator(false, 'HF Key: Missing');
    updateSettingsStatus(false, 'Disconnected', 'No API token entered yet.');
    return;
  }
  
  updateSettingsStatus(false, 'Verifying...', 'Contacting Hugging Face servers...', 'info');
  
  try {
    const response = await fetch('https://huggingface.co/api/whoami-v2', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.status === 200) {
      const data = await response.json();
      const name = data.name || 'User';
      updateStatusIndicator(true, `HF Key: Connected`);
      updateSettingsStatus(true, 'Connected', `Authenticated successfully as: ${name}`);
      if (showSuccessToast) showToast(`Successfully connected as ${name}!`, 'success');
    } else {
      updateStatusIndicator(false, 'HF Key: Invalid');
      updateSettingsStatus(false, 'Authentication Failed', 'Hugging Face API returned 401. Make sure your token is correct.', 'error');
      showToast('Authentication failed. Check your token.', 'error');
    }
  } catch (err) {
    updateStatusIndicator(false, 'HF Key: Network Error');
    updateSettingsStatus(false, 'Connection Error', 'Failed to connect to Hugging Face servers.', 'error');
    showToast('Network error verifying token.', 'error');
  }
}

async function verifyTokenSilently() {
  try {
    const response = await fetch('https://huggingface.co/api/whoami-v2', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.status === 200) {
      updateStatusIndicator(true, `HF Key: Connected`);
      updateSettingsStatus(true, 'Connected', 'API token verified and working.');
    } else {
      updateStatusIndicator(false, 'HF Key: Invalid');
    }
  } catch (err) {
    updateStatusIndicator(false, 'HF Key: Offline');
  }
}

function updateStatusIndicator(isConnected, text) {
  if (isConnected) {
    elements.statusDot.className = 'status-dot online';
    elements.statusText.textContent = text;
  } else {
    elements.statusDot.className = 'status-dot offline';
    elements.statusText.textContent = text;
  }
}

function updateSettingsStatus(isSuccess, title, desc, customClass = '') {
  elements.settingsStatusBox.className = 'settings-status-box';
  if (isSuccess) {
    elements.settingsStatusBox.classList.add('status-active');
    elements.settingsStatusIcon.className = 'fa-solid fa-circle-check';
  } else if (customClass === 'info') {
    elements.settingsStatusBox.style.backgroundColor = 'var(--bg-tertiary)';
    elements.settingsStatusBox.style.border = '1px solid var(--glass-border)';
    elements.settingsStatusBox.style.color = 'var(--text-main)';
    elements.settingsStatusIcon.className = 'fa-solid fa-circle-notch fa-spin';
  } else {
    elements.settingsStatusBox.classList.add('status-inactive');
    elements.settingsStatusIcon.className = 'fa-solid fa-triangle-exclamation';
  }
  
  elements.settingsStatusTitle.textContent = `Status: ${title}`;
  elements.settingsStatusDesc.textContent = desc;
}

// Playground Population & Inputs toggle
function populatePlaygroundModels() {
  const task = elements.selectPlayTask.value;
  const list = modelLists[task] || [];
  
  elements.selectPlayModel.innerHTML = '';
  list.forEach(m => {
    const option = document.createElement('option');
    option.value = m.id;
    option.textContent = m.name;
    elements.selectPlayModel.appendChild(option);
  });
  
  elements.customModelContainer.classList.add('hidden');
}

function togglePlaygroundInputs() {
  const task = elements.selectPlayTask.value;
  
  // Hide all inputs first
  document.querySelectorAll('.playground-task-inputs').forEach(inp => inp.classList.add('hidden'));
  
  // Hide all outputs
  document.querySelectorAll('.output-subpane').forEach(out => out.classList.add('hidden'));
  
  // Show active ones
  if (task === 'chat') {
    elements.inputsChat.classList.remove('hidden');
    elements.playOutChat.classList.remove('hidden');
  } else if (task === 'text-to-image') {
    elements.inputsImage.classList.remove('hidden');
    elements.playOutImage.classList.remove('hidden');
  } else if (task === 'text-to-speech') {
    elements.inputsTts.classList.remove('hidden');
    elements.playOutTts.classList.remove('hidden');
  } else if (task === 'image-classification') {
    elements.inputsClassification.classList.remove('hidden');
    elements.playOutClassification.classList.remove('hidden');
  }
}

function handleImageUpload(file) {
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = function(e) {
    elements.uploadedImagePreview.src = e.target.result;
    elements.uploadedImagePreviewContainer.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
  showToast('Image uploaded successfully!', 'success');
}

// Serverless Inference retry-on-503 loop
async function fetchHFInference(model, payload, isBinary = false, contentType = 'application/json') {
  const url = `https://api-inference.huggingface.co/models/${model}`;
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (!isBinary) {
    headers['Content-Type'] = contentType;
  }
  
  const options = {
    method: 'POST',
    headers: headers,
    body: isBinary ? payload : JSON.stringify(payload)
  };
  
  const retries = 5;
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    
    if (response.status === 200) {
      return response;
    }
    
    if (response.status === 503) {
      const errJson = await response.json();
      if (errJson.error && errJson.error.toLowerCase().includes('loading')) {
        const waitTime = Math.min(errJson.estimated_time || 15, 30);
        showToast(`Model ${model.split('/').pop()} is loading. Waiting ${Math.round(waitTime)}s...`, 'info');
        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
        continue;
      }
    }
    
    // Otherwise throw error
    const errText = await response.text();
    throw new Error(`Inference returned status ${response.status}: ${errText}`);
  }
  throw new Error('Model failed to load after retries');
}

// Playground execution logic
async function runPlaygroundInference() {
  if (!token) {
    showToast('Hugging Face API key is missing. Go to Settings.', 'error');
    elements.navSettings.click();
    return;
  }
  
  const task = elements.selectPlayTask.value;
  let model = elements.selectPlayModel.value;
  if (model === 'custom') {
    model = elements.inputCustomModel.value.trim();
    if (!model) {
      showToast('Please type a custom model repo ID.', 'error');
      return;
    }
  }
  
  // Show loading
  elements.playgroundLoader.classList.remove('hidden');
  elements.playgroundOutputArea.classList.add('hidden');
  
  try {
    if (task === 'chat') {
      const promptText = elements.playChatPrompt.value.trim() || 'Hello';
      
      // Render user bubble
      appendChatBubble(promptText, 'user');
      
      // Hit chat API
      const chatUrl = 'https://router.huggingface.co/v1/chat/completions';
      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: promptText }],
          max_tokens: 1024
        })
      });
      
      if (response.status !== 200) {
        // Fallback to retry loop for 503
        if (response.status === 503) {
          const res = await fetchHFInference(model, { inputs: promptText });
          const resJson = await res.json();
          // Extract text from raw outputs
          const text = Array.isArray(resJson) ? resJson[0].generated_text : (resJson.generated_text || JSON.stringify(resJson));
          appendChatBubble(text, 'assistant');
        } else {
          throw new Error(`Chat API status: ${response.status}`);
        }
      } else {
        const resJson = await response.json();
        const text = resJson.choices[0].message.content;
        appendChatBubble(text, 'assistant');
      }
      
    } else if (task === 'text-to-image') {
      const promptText = elements.playImagePrompt.value.trim() || 'a cute red panda';
      const response = await fetchHFInference(model, { inputs: promptText });
      const blob = await response.blob();
      
      const imgUrl = URL.createObjectURL(blob);
      elements.playOutImg.src = imgUrl;
      elements.playOutImg.classList.remove('hidden');
      elements.imgPlaceholder.classList.add('hidden');
      elements.imageActionButtons.classList.remove('hidden');
      elements.btnDownloadImage.href = imgUrl;
      
    } else if (task === 'text-to-speech') {
      const promptText = elements.playTtsPrompt.value.trim() || 'This is synthesized voice running on Hugging Face Serverless Inference.';
      const response = await fetchHFInference(model, { inputs: promptText });
      const blob = await response.blob();
      
      const audioUrl = URL.createObjectURL(blob);
      elements.playOutAudio.src = audioUrl;
      elements.audioPlayerWrapper.classList.remove('hidden');
      elements.audioPlaceholder.classList.add('hidden');
      
    } else if (task === 'image-classification') {
      if (!selectedFile) {
        showToast('Please upload an image first.', 'error');
        elements.playgroundLoader.classList.add('hidden');
        elements.playgroundOutputArea.classList.remove('hidden');
        return;
      }
      
      const arrayBuffer = await readFileAsArrayBuffer(selectedFile);
      const response = await fetchHFInference(model, arrayBuffer, true, selectedFile.type);
      const results = await response.json();
      
      renderClassificationBars(results);
    }
    
    showToast('Inference completed successfully!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
    console.error(err);
  } finally {
    elements.playgroundLoader.classList.add('hidden');
    elements.playgroundOutputArea.classList.remove('hidden');
  }
}

// Helpers for playground
function appendChatBubble(text, sender) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = `<p>${escapeHtml(text)}</p>`;
  elements.chatThreadContainer.appendChild(bubble);
  elements.playOutChat.scrollTop = elements.playOutChat.scrollHeight;
}

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

function renderClassificationBars(data) {
  elements.classificationResultsWrapper.innerHTML = '';
  elements.classPlaceholder.classList.add('hidden');
  elements.classificationResultsWrapper.classList.remove('hidden');
  
  if (!Array.isArray(data) || data.length === 0) {
    elements.classificationResultsWrapper.innerHTML = '<p>No labels detected.</p>';
    return;
  }
  
  data.slice(0, 5).forEach(item => {
    const label = item.label || 'unknown';
    const pct = ((item.score || 0) * 100).toFixed(2);
    
    const row = document.createElement('div');
    row.className = 'class-row';
    row.innerHTML = `
      <div class="class-info">
        <span class="class-label">${label}</span>
        <span class="class-pct">${pct}%</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" style="width: ${pct}%"></div>
      </div>
    `;
    elements.classificationResultsWrapper.appendChild(row);
  });
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ------------------ MULTI-AGENT PIPELINE EXECUTION ------------------
async function loadGuideline(role) {
  const fileMap = {
    planner: 'planning_guidelines.md',
    uiux: 'uiux_guidelines.md',
    coder: 'coding_guidelines.md',
    reviewer: 'reviewer_guidelines.md',
    marketing: 'marketing_guidelines.md'
  };
  const fileName = fileMap[role];
  if (!fileName) return '';
  try {
    const response = await fetch(`knowledge/${fileName}`);
    if (response.status === 200) {
      const text = await response.text();
      return `\n\nAdditional Role Guidelines:\n${text.strip ? text.strip() : text.trim()}`;
    }
  } catch (err) {
    console.warn(`Could not load guideline for ${role}:`, err);
  }
  return '';
}

async function startMultiAgentPipeline() {
  const prompt = elements.appPrompt.value.trim();
  if (!prompt) {
    showToast('Please type a prompt to build an app.', 'error');
    return;
  }
  if (!token) {
    showToast('Please set your HF Token in Settings.', 'error');
    return;
  }

  // Clear timeline and outputs
  resetTimeline();
  resetPipelinePreOutputs();
  
  elements.pipelineLoader.classList.remove('hidden');
  elements.pipelineExports.classList.add('hidden');
  elements.btnStartPipeline.disabled = true;

  const plannerModel = elements.selectPlanner.value;
  const uiuxModel = elements.selectUiux.value;
  const coderModel = elements.selectCoder.value;
  const reviewerModel = elements.selectReviewer.value;
  const marketingModel = elements.selectMarketing.value;

  try {
    // 1. PLANNING
    updateTimelineNode('Planner', 'running');
    elements.prePlanner.textContent = 'Planning agent is thinking...';
    
    const plannerGuideline = await loadGuideline('planner');
    const planPrompt = `Design a comprehensive software architecture, component files layout, styling system (Obsidian glassmorphism, responsive, HSL gradients), state flow, and core logic components. Output only detailed markdown instructions.\n\nProject Prompt: ${prompt}` + plannerGuideline;
    const planResult = await queryLLM(plannerModel, planPrompt);
    generatedFiles.plan = planResult;
    elements.prePlanner.textContent = planResult;
    updateTimelineNode('Planner', 'success');

    // 2. UI/UX DESIGN
    updateTimelineNode('Uiux', 'running');
    elements.preHtml.textContent = 'UI/UX agent is drafting HTML structure...';
    elements.preCss.textContent = 'UI/UX agent is drafting stylesheet...';
    
    const uiuxGuideline = await loadGuideline('uiux');
    const uiuxPrompt = `Based on this Implementation Plan, design the complete index.html structure and custom styling rules. Use modern layout standards, CSS grid/flexbox, custom animations, transitions, and glow-bordered layouts. Return HTML within \`\`\`html ... \`\`\` code block and CSS within \`\`\`css ... \`\`\` code block.\n\nProject: ${prompt}\n\nPlan:\n${planResult}` + uiuxGuideline;
    const uiuxResult = await queryLLM(uiuxModel, uiuxPrompt);
    
    // Parse files
    const htmlBlock = extractCodeBlock(uiuxResult, 'html') || uiuxResult;
    const cssBlock = extractCodeBlock(uiuxResult, 'css') || '/* See HTML style tags if empty */';
    
    generatedFiles.html = htmlBlock;
    generatedFiles.css = cssBlock;
    elements.preHtml.textContent = htmlBlock;
    elements.preCss.textContent = cssBlock;
    updateTimelineNode('Uiux', 'success');

    // 3. CODING, REVIEW & SELF-HEALING LOOP
    const maxLoops = 2;
    let loopCount = 0;
    let jsBlock = "";
    let reviewResult = "";
    
    while (loopCount < maxLoops) {
      loopCount++;
      
      // Update Coder timeline node
      updateTimelineNode('Coder', 'running');
      elements.preJs.textContent = `Coder agent is writing JavaScript logic (Iteration ${loopCount}/${maxLoops})...`;
      
      const coderGuideline = await loadGuideline('coder');
      let coderPrompt = "";
      if (loopCount > 1) {
        coderPrompt = `App Idea: ${prompt}\n\nHTML:\n${htmlBlock}\n\nCSS:\n${cssBlock}\n\nPrevious JS:\n${jsBlock}\n\nReviewer Feedback (Fix all these bugs!):\n${reviewResult}` + coderGuideline;
      } else {
        coderPrompt = `App Idea: ${prompt}\n\nHTML:\n${htmlBlock}\n\nCSS:\n${cssBlock}` + coderGuideline;
      }
      
      const jsResult = await queryLLM(coderModel, coderPrompt);
      jsBlock = extractCodeBlock(jsResult, 'javascript') || extractCodeBlock(jsResult, 'js') || jsResult;
      elements.preJs.textContent = jsBlock;
      updateTimelineNode('Coder', 'success');
      
      // Update Reviewer timeline node
      updateTimelineNode('Reviewer', 'running');
      elements.preReview.textContent = `Reviewer agent is reviewing files (Iteration ${loopCount}/${maxLoops})...`;
      
      const reviewerGuideline = await loadGuideline('reviewer');
      const reviewPrompt = `Perform a thorough review of the generated files. Spot missing handlers, styling inconsistencies, visual artifacts, or JavaScript bugs. Suggest improvements and write a markdown review report.\n\nHTML:\n${htmlBlock}\n\nCSS:\n${cssBlock}\n\nJS:\n${jsBlock}` + reviewerGuideline;
      
      reviewResult = await queryLLM(reviewerModel, reviewPrompt);
      elements.preReview.textContent = reviewResult;
      updateTimelineNode('Reviewer', 'success');
      
      // Check if we have critical bugs
      if (reviewResult.includes("CRITICAL BUG:") || reviewResult.toLowerCase().includes("critical bug")) {
        showToast(`Self-Healing active: Critical bugs found, running iteration ${loopCount + 1}...`, 'info');
      } else {
        break;
      }
    }
    
    generatedFiles.html = htmlBlock;
    generatedFiles.css = cssBlock;
    generatedFiles.js = jsBlock;
    generatedFiles.review = reviewResult;

    // 4. MARKETING & MONETIZATION
    updateTimelineNode('Marketing', 'running');
    elements.preMarketing.textContent = 'Marketing agent is formulating monetization and launch strategy...';
    
    const marketingGuideline = await loadGuideline('marketing');
    const marketingPrompt = `Perform a thorough analysis of the user's application, planning specification, reviewer feedback, and final code implementation. Design a custom income generation and launch marketing strategy for this project. Output your final report in a detailed markdown document.\n\nHTML:\n${htmlBlock}\n\nCSS:\n${cssBlock}\n\nJS:\n${jsBlock}\n\nReview Feedback:\n${reviewResult}` + marketingGuideline;
    const marketingResult = await queryLLM(marketingModel, marketingPrompt);
    generatedFiles.marketing = marketingResult;
    elements.preMarketing.textContent = marketingResult;
    updateTimelineNode('Marketing', 'success');

    elements.pipelineExports.classList.remove('hidden');
    showToast('Multi-Agent App generated successfully!', 'success');
  } catch (err) {
    showToast(err.message, 'error');
    console.error(err);
  } finally {
    elements.pipelineLoader.classList.add('hidden');
    elements.btnStartPipeline.disabled = false;
  }
}

// Helpers for multi-agent
async function queryLLM(model, promptText) {
  const url = 'https://router.huggingface.co/v1/chat/completions';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: 'user', content: promptText }],
      max_tokens: 2048,
      temperature: 0.2
    })
  });
  
  if (response.status !== 200) {
    // 503 retry handler
    if (response.status === 503) {
      const res = await fetchHFInference(model, { inputs: promptText });
      const resJson = await res.json();
      return Array.isArray(resJson) ? resJson[0].generated_text : (resJson.generated_text || JSON.stringify(resJson));
    }
    const err = await response.text();
    throw new Error(`HF API error: ${response.status}. ${err}`);
  }
  const json = await response.json();
  return json.choices[0].message.content;
}

function extractCodeBlock(text, lang) {
  const startTag = `\`\`\`${lang}`;
  if (!text.includes(startTag)) return null;
  try {
    const parts = text.split(startTag);
    const code = parts[1].split('\`\`\`')[0];
    return code.trim();
  } catch (err) {
    return null;
  }
}

function resetTimeline() {
  ['Planner', 'Uiux', 'Coder', 'Reviewer', 'Marketing'].forEach(agent => {
    const item = elements[`time${agent}`];
    item.className = 'timeline-item';
    const badge = item.querySelector('.badge');
    badge.className = 'badge badge-idle';
    badge.textContent = 'Idle';
  });
}

function updateTimelineNode(agent, state) {
  const item = elements[`time${agent}`];
  const badge = item.querySelector('.badge');
  
  if (state === 'running') {
    item.className = 'timeline-item active';
    badge.className = 'badge badge-running';
    badge.textContent = 'Running';
  } else if (state === 'success') {
    item.className = 'timeline-item completed';
    badge.className = 'badge badge-success';
    badge.textContent = 'Complete';
  }
}

function resetPipelinePreOutputs() {
  elements.prePlanner.textContent = 'Plan will appear here...';
  elements.preHtml.textContent = 'HTML layout will appear here...';
  elements.preCss.textContent = 'CSS styles will appear here...';
  elements.preJs.textContent = 'JS logic will appear here...';
  elements.preReview.textContent = 'Review report will appear here...';
  elements.preMarketing.textContent = 'Marketing and monetization strategy will appear here...';
}

function copyProjectFiles() {
  const combined = `/* === plan.md === */\n${generatedFiles.plan}\n\n/* === index.html === */\n${generatedFiles.html}\n\n/* === styles.css === */\n${generatedFiles.css}\n\n/* === app.js === */\n${generatedFiles.js}\n\n/* === review.md === */\n${generatedFiles.review}\n\n/* === marketing_strategy.md === */\n${generatedFiles.marketing}`;
  navigator.clipboard.writeText(combined)
    .then(() => showToast('Combined project files copied to clipboard!', 'success'))
    .catch(() => showToast('Failed to copy files.', 'error'));
}

function downloadProjectFiles() {
  // Download combined file layout
  const combined = `/* === plan.md === */\n${generatedFiles.plan}\n\n/* === index.html === */\n${generatedFiles.html}\n\n/* === styles.css === */\n${generatedFiles.css}\n\n/* === app.js === */\n${generatedFiles.js}\n\n/* === review.md === */\n${generatedFiles.review}\n\n/* === marketing_strategy.md === */\n${generatedFiles.marketing}`;
  
  const blob = new Blob([combined], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'aetheris_multi_agent_app.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Project file downloaded!', 'success');
}

// Start
window.onload = init;
