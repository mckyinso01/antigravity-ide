import os
import sys
import math
import struct
import wave
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

OUTPUT_DIR = r"c:\Users\Admin\.gemini\antigravity-ide\scratch\antigravity-ide\titan-cinematic-proof-kit"
FRAMES_DIR = os.path.join(OUTPUT_DIR, "story_frames")
os.makedirs(FRAMES_DIR, exist_ok=True)

BEFORE_IMG_PATH = r"C:\Users\Admin\.gemini\antigravity-ide\brain\e998cd56-0361-4727-83ca-18b2f87b589c\legacy_tech_extortion_before_1787405586677.jpg"
AFTER_IMG_PATH = r"C:\Users\Admin\.gemini\antigravity-ide\brain\e998cd56-0361-4727-83ca-18b2f87b589c\titan_sovereign_triumph_after_1787405604916.jpg"

WIDTH, HEIGHT = 1920, 1080
FPS = 30
TOTAL_SECONDS = 42
TOTAL_FRAMES = FPS * TOTAL_SECONDS

# Load Source Images
img_before_raw = Image.open(BEFORE_IMG_PATH).convert("RGB").resize((WIDTH, HEIGHT))
img_after_raw = Image.open(AFTER_IMG_PATH).convert("RGB").resize((WIDTH, HEIGHT))

# Color Palette
CYAN_ACCENT = (6, 182, 212)
GOLD_ACCENT = (245, 158, 11)
EMERALD_ACCENT = (16, 185, 129)
ROSE_ACCENT = (244, 63, 94)
WHITE = (255, 255, 255)
BG_DARK = (7, 11, 20)

print(f"[STORY ENGINE] Rendering {TOTAL_FRAMES} frames ({TOTAL_SECONDS}s at {FPS}fps)...")

# Fonts
font_hero = ImageFont.load_default()
font_title = ImageFont.load_default()
font_med = ImageFont.load_default()
font_small = ImageFont.load_default()
font_mono = ImageFont.load_default()

try:
    font_hero = ImageFont.truetype("arial.ttf", 60)
    font_title = ImageFont.truetype("arial.ttf", 42)
    font_med = ImageFont.truetype("arial.ttf", 26)
    font_small = ImageFont.truetype("arial.ttf", 20)
    font_mono = ImageFont.truetype("consola.ttf", 24)
except Exception as e:
    print(f"Font fallback: {e}")

for frame_idx in range(TOTAL_FRAMES):
    t = frame_idx / FPS
    base = Image.new("RGB", (WIDTH, HEIGHT), BG_DARK)
    
    # ACT I: THE LEGACY EXTORTION (0s to 12s) - Before Scene Zoom
    if t < 12.0:
        zoom_factor = 1.0 + (t / 12.0) * 0.15 # Slow dramatic push-in
        zw = int(WIDTH / zoom_factor)
        zh = int(HEIGHT / zoom_factor)
        zx = (WIDTH - zw) // 2
        zy = (HEIGHT - zh) // 2
        cropped = img_before_raw.crop((zx, zy, zx + zw, zy + zh)).resize((WIDTH, HEIGHT))
        
        # Vignette & Dark Overlay
        overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, int(120 + math.sin(t*3)*25)))
        cropped.paste(overlay, (0, 0), overlay)
        base = cropped
        draw = ImageDraw.Draw(base)
        
        # Upper Warning Badge
        draw.rectangle([(80, 60), (740, 115)], fill=(225, 29, 72, 220), outline=WHITE, width=1)
        draw.text((100, 75), "ACT I: THE LEGACY SOFTWARE EXTORTION", fill=WHITE, font=font_med)
        
        # Cinematic Text Box
        draw.rectangle([(80, HEIGHT - 240), (WIDTH - 80, HEIGHT - 70)], fill=(10, 15, 26, 230), outline=ROSE_ACCENT, width=2)
        draw.text((120, HEIGHT - 215), "HOSPITALS & BUSINESSES ARE HELD HOSTAGE.", fill=ROSE_ACCENT, font=font_title)
        draw.text((120, HEIGHT - 155), "Legacy enterprise vendors charge $500,000+/yr for clunky, lagging 90s software while claiming 30% denial rates.", fill=WHITE, font=font_med)

    # ACT II: THE 5 AGONIZING PAIN POINTS (12s to 22s) - Split Cards
    elif t < 22.0:
        draw = ImageDraw.Draw(base)
        
        # Background Grid
        for x in range(0, WIDTH, 60):
            draw.line([(x, 0), (x, HEIGHT)], fill=(15, 23, 42), width=1)
        for y in range(0, HEIGHT, 60):
            draw.line([(0, y), (WIDTH, y)], fill=(15, 23, 42), width=1)

        draw.rectangle([(80, 50), (WIDTH - 80, 110)], fill=(13, 21, 39), outline=ROSE_ACCENT, width=2)
        draw.text((110, 65), "ACT II: THE REAL COST OF VENDOR LOCK-IN & OUTDATED TECH", fill=ROSE_ACCENT, font=font_title)

        cards = [
            ("CLINICAL BURNOUT", "Doctors waste 4 hrs/day in EHR paper binders", "$500k Annual License Cost"),
            ("INSURANCE DENIALS", "$1.2M lost annually to bad-faith rejections", "Carriers Bet You Won't Fight"),
            ("CONSTRUCTION DISPUTES", "Bending moment risks & retainage lawsuits", "10% Subcontractor Cash Lockup"),
            ("SUPPLY CHAIN STOCKOUTS", "Manual spreadsheet picking & supplier overcharges", "Thousands Lost in Urgent Restocks"),
            ("E-COMMERCE AD BOUNCE", "85% bounce rate on unoptimized landing pages", "$10k+ Ad Spend Vaporized")
        ]
        
        active_sub_card = int((t - 12.0) / 2.0) % 5
        
        for i, (p_title, p_desc, p_loss) in enumerate(cards):
            cy = 150 + i * 165
            is_active = (i == active_sub_card)
            border_col = ROSE_ACCENT if is_active else (51, 65, 85)
            bg_col = (25, 15, 25) if is_active else (15, 23, 42)
            
            draw.rectangle([(120, cy), (WIDTH - 120, cy + 140)], fill=bg_col, outline=border_col, width=2 if is_active else 1)
            draw.text((150, cy + 20), f"0{i+1}. {p_title}", fill=ROSE_ACCENT if is_active else WHITE, font=font_title if is_active else font_med)
            draw.text((150, cy + 75), p_desc, fill=WHITE if is_active else (148, 163, 184), font=font_med if is_active else font_small)
            draw.text((WIDTH - 520, cy + 50), p_loss, fill=GOLD_ACCENT, font=font_med)

    # ACT III: THE SOVEREIGN AI REVOLUTION (22s to 34s) - After Scene
    elif t < 34.0:
        zoom_factor = 1.0 + ((t - 22.0) / 12.0) * 0.12
        zw = int(WIDTH / zoom_factor)
        zh = int(HEIGHT / zoom_factor)
        zx = (WIDTH - zw) // 2
        zy = (HEIGHT - zh) // 2
        cropped = img_after_raw.crop((zx, zy, zx + zw, zy + zh)).resize((WIDTH, HEIGHT))
        
        overlay = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 80))
        cropped.paste(overlay, (0, 0), overlay)
        base = cropped
        draw = ImageDraw.Draw(base)

        # Upper Green Success Badge
        draw.rectangle([(80, 60), (740, 115)], fill=(5, 150, 105, 220), outline=WHITE, width=1)
        draw.text((100, 75), "ACT III: THE TITAN 33-AI SOVEREIGN TRIUMPH", fill=WHITE, font=font_med)

        # Floating Glassmorphic Metric Box
        draw.rectangle([(80, HEIGHT - 260), (WIDTH - 80, HEIGHT - 70)], fill=(10, 15, 26, 230), outline=EMERALD_ACCENT, width=2)
        draw.text((120, HEIGHT - 235), "ENTERPRISE SOVEREIGNTY: 100% IP OWNERSHIP & ZERO VENDOR LOCK-IN", fill=EMERALD_ACCENT, font=font_title)
        draw.text((120, HEIGHT - 175), "Sub-second AI speeds, automated $12.5k pharma bounties, 18% ERISA recovery, and mobile 3D LiDAR scans.", fill=WHITE, font=font_med)
        draw.text((120, HEIGHT - 125), "+14.8% YTD Operating Margin • $0 Upfront Contingency Options • Air-Gapped Codebases", fill=CYAN_ACCENT, font=font_small)

    # ACT IV: THE GRAND REVERSAL & CALL TO ACTION (34s to 42s)
    else:
        draw = ImageDraw.Draw(base)
        
        # Ambient Grid
        for x in range(0, WIDTH, 60):
            draw.line([(x, 0), (x, HEIGHT)], fill=(15, 23, 42), width=1)
        for y in range(0, HEIGHT, 60):
            draw.line([(0, y), (WIDTH, y)], fill=(15, 23, 42), width=1)

        draw.text((WIDTH // 2 - 420, 140), "RECLAIM YOUR FINANCIAL SOVEREIGNTY", fill=CYAN_ACCENT, font=font_hero)
        draw.text((WIDTH // 2 - 380, 240), "Stop paying extortionate legacy fees. Deploy the 33-Titan Autonomous Factory.", fill=WHITE, font=font_med)

        # Comparison Split Box
        draw.rectangle([(160, 320), (WIDTH // 2 - 30, 720)], fill=(25, 15, 20), outline=ROSE_ACCENT, width=2)
        draw.text((200, 360), "❌ THE OLD LEGACY WAY", fill=ROSE_ACCENT, font=font_title)
        draw.text((200, 440), "• $500,000 / yr Perpetual Fee Bleed", fill=WHITE, font=font_med)
        draw.text((200, 500), "• 6-9 Month Implementation Delays", fill=WHITE, font=font_med)
        draw.text((200, 560), "• 100% Vendor Lock-in & Data Hostage", fill=WHITE, font=font_med)
        draw.text((200, 620), "• Outdated, Clunky 90s Interface", fill=WHITE, font=font_med)

        draw.rectangle([(WIDTH // 2 + 30, 320), (WIDTH - 160, 720)], fill=(10, 25, 20), outline=EMERALD_ACCENT, width=2)
        draw.text((WIDTH // 2 + 70, 360), "✓ THE TITAN 33-AI FACTORY", fill=EMERALD_ACCENT, font=font_title)
        draw.text((WIDTH // 2 + 70, 440), "• 100% Sovereign Air-Gapped Code (Self-Host)", fill=WHITE, font=font_med)
        draw.text((WIDTH // 2 + 70, 500), "• 48-Hour Deployment & Zero-Defect Gates", fill=WHITE, font=font_med)
        draw.text((WIDTH // 2 + 70, 500), "• 15% Pure Contingency ROI ($0 Upfront)", fill=WHITE, font=font_med)
        draw.text((WIDTH // 2 + 70, 620), "• Space-Grade Sub-Second UI/UX Speed", fill=WHITE, font=font_med)

        # CTA Bar
        draw.rectangle([(WIDTH // 2 - 320, 780), (WIDTH // 2 + 320, 870)], fill=CYAN_ACCENT)
        draw.text((WIDTH // 2 - 250, 810), "CLAIM YOUR 7-DAY REVERSE TRIAL ➔", fill=(7, 11, 20), font=font_title)

    # Global Telemetry Header
    draw.rectangle([(0, 0), (WIDTH, 50)], fill=(13, 21, 39))
    draw.line([(0, 50), (WIDTH, 50)], fill=CYAN_ACCENT, width=2)
    draw.text((30, 14), "TITAN AI CINEMATIC DOCUSERIES: 'THE DEATH OF LEGACY TECH EXTORTION'", fill=WHITE, font=font_small)
    draw.text((WIDTH - 360, 14), f"TIMECODE: 00:{int(t):02d}:{int((t%1)*30):02d} | 60 FPS", fill=CYAN_ACCENT, font=font_mono)

    frame_path = os.path.join(FRAMES_DIR, f"frame_{frame_idx:04d}.png")
    base.save(frame_path)
    if frame_idx % 250 == 0:
        print(f"  Frame {frame_idx}/{TOTAL_FRAMES} rendered ({int(t)}s)...")

print("[OK] All story frames rendered successfully!")

# Audio Soundtrack (Dramatic Heartbeat to Cyber Heroic Synthesis)
AUDIO_PATH = os.path.join(OUTPUT_DIR, "story_soundtrack.wav")
SAMPLE_RATE = 44100
total_samples = int(SAMPLE_RATE * TOTAL_SECONDS)

print(f"[AUDIO] Synthesizing narrative soundtrack to {AUDIO_PATH}...")
audio_data = []

for s in range(total_samples):
    t = s / SAMPLE_RATE
    
    # Tension Heartbeat in Act I & II (0-22s)
    if t < 22.0:
        hb_t = (t * 1.3) % 1.0
        hb_env = math.exp(-hb_t * 10.0) if hb_t < 0.4 else (math.exp(-(hb_t - 0.25) * 12.0) if hb_t > 0.25 else 0)
        sub_bass = math.sin(2 * math.pi * 48.0 * t) * hb_env * 0.6
        tension_drone = math.sin(2 * math.pi * 110.0 * t) * 0.06
        sample_val = sub_bass + tension_drone
    # Triumphant Cyber Synth in Act III & IV (22-42s)
    else:
        beat = (t * 2.1) % 1.0
        kick_env = math.exp(-beat * 8.0)
        kick = math.sin(2 * math.pi * 55.0 * t) * kick_env * 0.5
        
        # Heroic major triad arpeggio (C Major -> G Major -> F Major)
        chords = [[261.63, 329.63, 392.00, 523.25], [392.00, 493.88, 587.33, 783.99], [349.23, 440.00, 523.25, 698.46]]
        chord = chords[int((t - 22.0) / 4.0) % len(chords)]
        note = chord[int(t * 8) % len(chord)]
        lead_synth = math.sin(2 * math.pi * note * t) * 0.15
        
        hat = (np.random.rand() * 2 - 1) * math.exp(-((t * 4.2) % 1.0) * 18.0) * 0.08
        sample_val = kick + lead_synth + hat

    sample_val = max(-0.95, min(0.95, sample_val))
    int_sample = int(sample_val * 32767)
    audio_data.append(struct.pack('<hh', int_sample, int_sample))

with wave.open(AUDIO_PATH, 'w') as wav_file:
    wav_file.setnchannels(2)
    wav_file.setsampwidth(2)
    wav_file.setframerate(SAMPLE_RATE)
    wav_file.writeframes(b''.join(audio_data))

print("[OK] Narrative soundtrack synthesized!")

FINAL_STORY_MP4 = os.path.join(OUTPUT_DIR, "TITAN_LEGACY_EXTORTION_VS_SOVEREIGN_AI_STORY.mp4")
print(f"[FFMPEG] Compiling story MP4 to {FINAL_STORY_MP4}...")

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
    FINAL_STORY_MP4
]

res = subprocess.run(cmd, capture_output=True, text=True)
if res.returncode == 0:
    print(f"[SUCCESS] Storytelling Video Rendered: {FINAL_STORY_MP4}")
    file_size_mb = os.path.getsize(FINAL_STORY_MP4) / (1024 * 1024)
    print(f"[METRICS] Size: {file_size_mb:.2f} MB")
else:
    print(f"[ERROR] FFmpeg error: {res.stderr}")
