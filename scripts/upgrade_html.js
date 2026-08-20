const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'gatzdevs-cinematic');

function upgradeHtml(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add Favicon in Head
    if (!content.includes('rel="icon"')) {
        content = content.replace('<head>', '<head>\n<link rel="icon" type="image/svg+xml" href="favicon.svg" />\n<link rel="apple-touch-icon" href="favicon.svg" />');
    }

    // 2. Replace Agency Economics with 10x Velocity & Enterprise AI ROI
    content = content.replace(/1\/10th Agency Economics/g, '10x Velocity & High-ROI AI Economics');
    content = content.replace(/Agency-grade systems delivered at solo-studio pricing[\s\S]*?with 0 overhead\./g, 
        'Production-ready autonomous AI systems deployed in days, not quarters. Direct integration with Google Cloud & Vertex AI infrastructure with zero agency bloat.');

    // 3. Upgrade Mission & Vision
    content = content.replace(/To revolutionize the global software landscape by proving that an autonomous[\s\S]*?50-person engineering teams\./g,
        'To pioneer intelligent agentic ecosystems that empower healthcare networks, supply chains, and industrial leaders with self-optimizing, zero-downtime AI backbones powered by Google Cloud and Vertex AI.');

    content = content.replace(/Direct engagement with Mharc Gatan[\s\S]*?advisory engagements\./g,
        'Partner with LinkableAI—architected by Mharc Gatan and engineered with Google Cloud & Vertex AI zero-defect precision. Accepting enterprise deployments and strategic AI infrastructure partnerships.');

    // 4. Update Header Logo
    content = content.replace(/<span class="text-accent-cyan font-mono text-xl">&lt;<\/span><span class="font-bold tracking-tight text-white">[^<]+<\/span><span class="text-accent-electric">[^<]+<\/span><span class="text-accent-cyan font-mono text-xl">\/&gt;<\/span>/g, 
        '<img src="assets/logos/linkable_logo_variant_1.svg" class="w-8 h-8 rounded-lg shadow-lg shadow-cyan-500/20" alt="LinkableAI Logo" /><span class="font-bold tracking-tight text-white font-display text-lg">Linkable<span class="text-accent-cyan">AI</span></span>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully upgraded: ' + filePath);
}

upgradeHtml(path.join(dir, 'index.html'));
upgradeHtml(path.join(dir, '200.html'));
