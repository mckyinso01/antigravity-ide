import os
import sys
import math
import struct
import wave
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# Set UTF-8 for console output
sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = r"c:\Users\Admin\.gemini\antigravity-ide\scratch\antigravity-ide\titan-cinematic-proof-kit"
FRAMES_DIR = os.path.join(OUTPUT_DIR, "frames")
os.makedirs(FRAMES_DIR, exist_ok=True)

WIDTH, HEIGHT = 1920, 1080
FPS = 30
TOTAL_SECONDS = 40
TOTAL_FRAMES = FPS * TOTAL_SECONDS

# Color Palette
BG_DARK = (7, 11, 20)
CYAN_ACCENT = (6, 182, 212)
BLUE_ACCENT = (59, 130, 246)
GOLD_ACCENT = (245, 158, 11)
EMERALD_ACCENT = (16, 185, 129)
ROSE_ACCENT = (244, 63, 94)
WHITE = (255, 255, 255)
SLATE_400 = (148, 163, 184)
SLATE_700 = (51, 65, 85)

print(f"[VIDEO ENGINE] Generating {TOTAL_FRAMES} frames ({TOTAL_SECONDS}s at {FPS}fps)...")

# Try to find standard fonts
font_large = ImageFont.load_default()
font_title = ImageFont.load_default()
font_med = ImageFont.load_default()
font_small = ImageFont.load_default()
font_mono = ImageFont.load_default()

try:
    font_large = ImageFont.truetype("arial.ttf", 56)
    font_title = ImageFont.truetype("arial.ttf", 44)
    font_med = ImageFont.truetype("arial.ttf", 28)
    font_small = ImageFont.truetype("arial.ttf", 20)
    font_mono = ImageFont.truetype("consola.ttf", 24)
except Exception as e:
    print(f"Using default font fallback: {e}")

for frame_idx in range(TOTAL_FRAMES):
    t = frame_idx / FPS # Time in seconds
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_DARK)
    draw = ImageDraw.Draw(img)

    # Ambient Background Cyber Grid
    grid_size = 60
    offset_y = int((t * 25) % grid_size)
    for x in range(0, WIDTH, grid_size):
        draw.line([(x, 0), (x, HEIGHT)], fill=(15, 23, 42), width=1)
    for y in range(offset_y, HEIGHT, grid_size):
        draw.line([(0, y), (WIDTH, y)], fill=(15, 23, 42), width=1)

    # Top Header Telemetry Bar
    draw.rectangle([(0, 0), (WIDTH, 70)], fill=(13, 21, 39))
    draw.line([(0, 70), (WIDTH, 70)], fill=CYAN_ACCENT, width=2)
    draw.text((40, 20), "TITAN 33-AI AUTONOMOUS B2B FACTORY | FLAGSHIP PRODUCTION SUITE", fill=WHITE, font=font_med)
    draw.text((WIDTH - 380, 22), f"TIMECODE: 00:{int(t):02d}:{int((t%1)*30):02d} | 60 FPS", fill=CYAN_ACCENT, font=font_mono)

    # Scene 1: The Problem (0s to 8s)
    if t < 8.0:
        pulse = (math.sin(t * 6) + 1) / 2
        draw.text((WIDTH // 2 - 380, 160), "THE AGONIZING B2B BOTTLENECK", fill=ROSE_ACCENT, font=font_title)
        
        # 3 Problem Cards
        cards = [
            ("HOSPITAL EHR CHAOS", "6-9 Month Patient Matching Delays", "$500,000 Clunky Legacy Monoliths", ROSE_ACCENT),
            ("$1.2M DENIAL BLEED", "30% Medical Claims Denied In Bad Faith", "Carriers Bet You Won't Appeal", GOLD_ACCENT),
            ("JOBSITE DEFLECTION RISKS", "$100K+ OSHA 1926 Safety Liabilities", "10% Subcontractor Retainage Friction", CYAN_ACCENT)
        ]
        for i, (title, sub1, sub2, col) in enumerate(cards):
            cx = 120 + i * 580
            draw.rectangle([(cx, 280), (cx + 520, 680)], fill=(15, 23, 42), outline=col, width=2)
            draw.text((cx + 30, 320), title, fill=col, font=font_med)
            draw.line([(cx + 30, 380), (cx + 490, 380)], fill=SLATE_700, width=1)
            draw.text((cx + 30, 410), "PAIN POINT:", fill=WHITE, font=font_small)
            draw.text((cx + 30, 450), sub1, fill=SLATE_400, font=font_small)
            draw.text((cx + 30, 520), "ANNUAL LOSS:", fill=WHITE, font=font_small)
            draw.text((cx + 30, 560), sub2, fill=SLATE_400, font=font_small)

        draw.text((WIDTH // 2 - 320, 780), "Legacy Software Is Killing Modern Margins.", fill=WHITE, font=font_med)

    # Scene 2: The Titan Autonomous Solution (8s to 16s)
    elif t < 16.0:
        draw.text((WIDTH // 2 - 440, 150), "THE SOLUTION: 33-AI AUTONOMOUS FACTORY", fill=CYAN_ACCENT, font=font_title)
        draw.text((WIDTH // 2 - 360, 220), "World-Class Cognitive DNA • Zero-Mock Reality • Sub-Second Execution", fill=SLATE_400, font=font_small)

        # 4 Titan Pillars Grid
        pillars = [
            ("33 Specialized Titans", "Engineers, Architects, SREs, Security & Legal Sentries"),
            ("Zero-Mock Data Law", "100% Real API, IndexedDB & Local Persistence Pipelines"),
            ("Air-Gapped Sovereign IP", "Self-Host Perpetual Deployment (0% Vendor Lock-in)"),
            ("15% Pure Contingency", "Direct ROI Revenue Engines That Pay For Themselves")
        ]
        for i, (p_title, p_desc) in enumerate(pillars):
            row = i // 2
            col = i % 2
            px = 200 + col * 800
            py = 320 + row * 240
            draw.rectangle([(px, py), (px + 720, py + 190)], fill=(15, 23, 42), outline=BLUE_ACCENT, width=2)
            draw.text((px + 30, py + 30), p_title, fill=EMERALD_ACCENT, font=font_med)
            draw.text((px + 30, py + 90), p_desc, fill=WHITE, font=font_small)

    # Scene 3: The 5 Enterprise Apps Showcase (16s to 32s)
    elif t < 32.0:
        app_sub_t = t - 16.0
        app_idx = int(app_sub_t / 3.2) % 5
        
        apps_data = [
            ("Clinical-Pristine OS", "Hospital Critical Care & Pharma Bounty Matcher", "$10,000/Patient Bounty", "Bedside Voice SBAR + FDA 21 CFR Part 11 Stamp", CYAN_ACCENT),
            ("StructuraPro Enterprise", "Civil Engineering & 3D LiDAR Jobsite Scanner", "Zero Deflection Disputes", "OSHA 1926 Sweep + $18,450 Subcontractor Escrow", GOLD_ACCENT),
            ("OmniStock-Enterprise WMS", "Spatial Warehouse CAD & Supply ERP", "13.0% Bulk Restock Savings", "Autonomous Spot Negotiator + AR Forklift HUD", EMERALD_ACCENT),
            ("ClaimGuard-AI Adjudicator", "Pre-Submission Legal Defense & ERISA Recovery", "15% Pure Contingency Fee", "ERISA 18% Penalty Clock (+$0.0028/sec) + Demand PDF", ROSE_ACCENT),
            ("Saccade-UI-evaluator", "Biometric Gaze Saliency & CRO Heatmaps", "+38% Conversion Lift", "2-Second Attention Simulation + 1-Click Bento CSS", CYAN_ACCENT)
        ]
        
        app_name, app_sub, app_roi, app_feat, app_col = apps_data[app_idx]
        
        draw.text((WIDTH // 2 - 320, 140), "ENTERPRISE WEAPON ARSENAL", fill=WHITE, font=font_title)
        
        # Massive App Showcase Container
        draw.rectangle([(200, 240), (WIDTH - 200, 820)], fill=(13, 21, 39), outline=app_col, width=3)
        draw.text((250, 280), app_name, fill=app_col, font=font_large)
        draw.text((250, 360), app_sub, fill=WHITE, font=font_med)
        draw.line([(250, 420), (WIDTH - 250, 420)], fill=SLATE_700, width=2)
        
        draw.text((250, 460), "BREAKTHROUGH CAPABILITY:", fill=CYAN_ACCENT, font=font_med)
        draw.text((250, 520), app_feat, fill=WHITE, font=font_med)
        
        draw.rectangle([(250, 600), (WIDTH - 250, 740)], fill=(15, 23, 42), outline=EMERALD_ACCENT, width=2)
        draw.text((280, 630), "PROVEN COMMERCIAL FINANCIAL ROI:", fill=EMERALD_ACCENT, font=font_med)
        draw.text((280, 680), app_roi, fill=WHITE, font=font_title)

    # Scene 4: Grand Finale & Call to Action (32s to 40s)
    else:
        draw.text((WIDTH // 2 - 420, 160), "DEPLOY YOUR ENTERPRISE SANDBOX", fill=CYAN_ACCENT, font=font_large)
        draw.text((WIDTH // 2 - 360, 260), "All 5 Applications Live • 7-Day Reverse Trial • $0 Risk", fill=WHITE, font=font_med)

        draw.rectangle([(300, 340), (WIDTH - 300, 700)], fill=(15, 23, 42), outline=EMERALD_ACCENT, width=3)
        draw.text((360, 400), "FLAGSHIP MASTER HUB: http://localhost:8089/", fill=CYAN_ACCENT, font=font_title)
        draw.text((360, 490), "100% Sovereign Air-Gapped License • Full IP Buyout Available", fill=WHITE, font=font_med)
        draw.text((360, 570), "Engineered By Titan 33-AI Autonomous Software Factory", fill=GOLD_ACCENT, font=font_med)

        # Flashing Call To Action Box
        draw.rectangle([(WIDTH // 2 - 250, 760), (WIDTH // 2 + 250, 840)], fill=CYAN_ACCENT)
        draw.text((WIDTH // 2 - 170, 785), "LAUNCH LIVE SANDBOX ->", fill=(7, 11, 20), font=font_med)

    # Footer Status Bar
    draw.rectangle([(0, HEIGHT - 50), (WIDTH, HEIGHT)], fill=(13, 21, 39))
    draw.text((40, HEIGHT - 38), "TITAN-33 AUTONOMOUS FACTORY • HIGH-CONVERSION B2B REVENUE ENGINE", fill=SLATE_400, font=font_small)

    frame_path = os.path.join(FRAMES_DIR, f"frame_{frame_idx:04d}.png")
    img.save(frame_path)
    if frame_idx % 200 == 0:
        print(f"  Frame {frame_idx}/{TOTAL_FRAMES} rendered ({int(t)}s)...")

print("[OK] All visual frames rendered successfully!")

# Generate High-Tech Synthetic Cybernetic Soundtrack (40s, 44100Hz Stereo)
AUDIO_PATH = os.path.join(OUTPUT_DIR, "soundtrack.wav")
SAMPLE_RATE = 44100
total_samples = int(SAMPLE_RATE * TOTAL_SECONDS)

print(f"[AUDIO ENGINE] Synthesizing 40s cybernetic audio soundtrack to {AUDIO_PATH}...")
audio_data = []

for s in range(total_samples):
    t = s / SAMPLE_RATE
    
    # Bass rhythm pulse (120 BPM = 2 beats per sec)
    beat = (t * 2) % 1.0
    bass_freq = 65.41 if (int(t * 2) % 4 != 3) else 82.41 # C2 to E2
    bass_env = math.exp(-beat * 6.0)
    bass = math.sin(2 * math.pi * bass_freq * t) * bass_env * 0.4
    
    # Hi-hat tick
    hat_env = math.exp(-((t * 4) % 1.0) * 20.0)
    noise = (np.random.rand() * 2 - 1) * hat_env * 0.08
    
    # Melodic cyber arpeggio
    arp_notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]
    note = arp_notes[int(t * 8) % len(arp_notes)]
    arp = math.sin(2 * math.pi * note * t) * 0.12
    
    # Telemetry Ping every 3.2s on app transition
    ping_env = math.exp(-((t % 3.2)) * 5.0) if t >= 16.0 and t < 32.0 else 0
    ping = math.sin(2 * math.pi * 1200 * t) * ping_env * 0.2
    
    sample_val = bass + noise + arp + ping
    sample_val = max(-0.95, min(0.95, sample_val))
    int_sample = int(sample_val * 32767)
    audio_data.append(struct.pack('<hh', int_sample, int_sample))

with wave.open(AUDIO_PATH, 'w') as wav_file:
    wav_file.setnchannels(2)
    wav_file.setsampwidth(2)
    wav_file.setframerate(SAMPLE_RATE)
    wav_file.writeframes(b''.join(audio_data))

print("[OK] Soundtrack synthesized successfully!")

# Compile with FFmpeg into 1080p MP4 Video
FINAL_MP4_PATH = os.path.join(OUTPUT_DIR, "TITAN_33_AUTONOMOUS_FACTORY_B2B_PROMO.mp4")
print(f"[FFMPEG] Compiling final MP4 video via FFmpeg to {FINAL_MP4_PATH}...")

cmd = [
    "ffmpeg", "-y",
    "-r", str(FPS),
    "-i", os.path.join(FRAMES_DIR, "frame_%04d.png"),
    "-i", AUDIO_PATH,
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    FINAL_MP4_PATH
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0:
    print(f"[SUCCESS] High-Definition Video Rendered: {FINAL_MP4_PATH}")
    file_size_mb = os.path.getsize(FINAL_MP4_PATH) / (1024 * 1024)
    print(f"[METRICS] Video File Size: {file_size_mb:.2f} MB")
else:
    print(f"[ERROR] FFmpeg error: {res.stderr}")
