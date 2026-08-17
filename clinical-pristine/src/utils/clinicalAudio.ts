// Clinical Web Audio API Sound Effects Engine (Zero External Audio File Dependency)
// Features: Lookahead Hardware-Thread Scheduler & Inline Web Worker to Prevent Tab Throttling Drift

class ClinicalAudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  
  // Precision Metronome Engine (Lookahead Scheduler)
  private worker: Worker | null = null;
  private isMetronomeRunning: boolean = false;
  private nextNoteTime: number = 0;
  private currentBpm: number = 110;
  private lookaheadMs: number = 25.0; // How frequently worker checks (ms)
  private scheduleAheadSec: number = 0.1; // How far ahead to schedule audio (sec)
  private onTickCallback: ((count: number) => void) | null = null;
  private metronomeTickCount: number = 0;

  constructor() {
    this.isMuted = localStorage.getItem('pristine_audio_muted') === 'true';
    this.initWorker();
  }

  private initWorker() {
    try {
      // Inline Web Worker prevents background tab execution throttling in Chrome/Safari
      const blobCode = `
        var timerId = null;
        var interval = 25;
        self.onmessage = function(e) {
          if (e.data === 'start') {
            if (!timerId) {
              timerId = setInterval(function() {
                self.postMessage('tick');
              }, interval);
            }
          } else if (e.data === 'stop') {
            if (timerId) {
              clearInterval(timerId);
              timerId = null;
            }
          }
        };
      `;
      const blob = new Blob([blobCode], { type: 'application/javascript' });
      this.worker = new Worker(URL.createObjectURL(blob));
      this.worker.onmessage = (e) => {
        if (e.data === 'tick') {
          this.scheduler();
        }
      };
    } catch {
      // Fallback if workers restricted
      this.worker = null;
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('pristine_audio_muted', String(this.isMuted));
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // -------------------------------------------------------------
  // PRECISION LOOKAHEAD CPR METRONOME (Immune to Tab Backgrounding)
  // -------------------------------------------------------------
  public startPrecisionMetronome(bpm: number = 110, onTick?: (count: number) => void) {
    this.initCtx();
    if (!this.ctx) return;

    this.currentBpm = bpm;
    this.onTickCallback = onTick || null;
    this.metronomeTickCount = 0;
    this.isMetronomeRunning = true;
    this.nextNoteTime = this.ctx.currentTime + 0.05;

    if (this.worker) {
      this.worker.postMessage('start');
    } else {
      // Fallback interval
      const interval = setInterval(() => {
        if (!this.isMetronomeRunning) {
          clearInterval(interval);
          return;
        }
        this.scheduler();
      }, this.lookaheadMs);
    }
  }

  public stopPrecisionMetronome() {
    this.isMetronomeRunning = false;
    if (this.worker) {
      this.worker.postMessage('stop');
    }
  }

  private scheduler() {
    if (!this.ctx || !this.isMetronomeRunning) return;

    // While there are notes that will need to play before the next interval, schedule them
    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadSec) {
      this.scheduleCprClick(this.nextNoteTime);
      const secondsPerBeat = 60.0 / this.currentBpm;
      this.nextNoteTime += secondsPerBeat;
    }
  }

  private scheduleCprClick(time: number) {
    if (!this.ctx) return;
    
    this.metronomeTickCount++;
    if (this.onTickCallback) {
      this.onTickCallback(this.metronomeTickCount);
    }

    if (this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, time); // 880Hz crisp high click

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.08);
    } catch {
      // Ignore audio error
    }
  }

  // Backward compatible one-shot click
  public playCprClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.scheduleCprClick(this.ctx.currentTime);
    } catch {
      // Ignore audio error
    }
  }

  // Soft subtle click on drawer open / tab switch
  public playDrawerSwoosh() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // Ignore audio failure
    }
  }

  // Pleasant positive chime on medication administration / dual-sign completion
  public playSuccessChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.08));

        gain.gain.setValueAtTime(0.08, now + (idx * 0.08));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.08) + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + (idx * 0.08));
        osc.stop(now + (idx * 0.08) + 0.26);
      });
    } catch {
      // Ignore audio failure
    }
  }

  // Subtle alert tone for STAT lab or Code Blue trigger
  public playAlertTone() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(880, now + 0.1);
      osc.frequency.setValueAtTime(440, now + 0.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Ignore audio failure
    }
  }

  // Defibrillator Charging Tone (Ascending pitch whine)
  public playDefibCharge(durationSeconds: number = 2.5) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + durationSeconds);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.setValueAtTime(0.15, now + durationSeconds);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + durationSeconds);

      // Continuous ready beep
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const rNow = this.ctx.currentTime;
        const readyOsc = this.ctx.createOscillator();
        const readyGain = this.ctx.createGain();

        readyOsc.type = 'sine';
        readyOsc.frequency.setValueAtTime(1760, rNow);
        readyGain.gain.setValueAtTime(0.2, rNow);
        readyGain.gain.exponentialRampToValueAtTime(0.001, rNow + 0.28);

        readyOsc.connect(readyGain);
        readyGain.connect(this.ctx.destination);

        readyOsc.start(rNow);
        readyOsc.stop(rNow + 0.3);
      }, durationSeconds * 1000);
    } catch {
      // Ignore audio failure
    }
  }

  // Defibrillator Shock Discharge Sound (Heavy low-end impact & spark snap)
  public playDefibShock() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      // Low boom
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);

      // High electrical snap
      const snapOsc = this.ctx.createOscillator();
      const snapGain = this.ctx.createGain();
      snapOsc.type = 'square';
      snapOsc.frequency.setValueAtTime(2400, now);
      snapOsc.frequency.exponentialRampToValueAtTime(100, now + 0.08);

      snapGain.gain.setValueAtTime(0.18, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      snapOsc.connect(snapGain);
      snapGain.connect(this.ctx.destination);

      snapOsc.start(now);
      snapOsc.stop(now + 0.09);
    } catch {
      // Ignore audio failure
    }
  }

  // Triumphant ROSC Return of Spontaneous Circulation Chime
  public playRoscFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.12));

        gain.gain.setValueAtTime(0.12, now + (idx * 0.12));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.12) + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + (idx * 0.12));
        osc.stop(now + (idx * 0.12) + 0.65);
      });
    } catch {
      // Ignore audio failure
    }
  }
}

export const clinicalAudio = new ClinicalAudioService();
