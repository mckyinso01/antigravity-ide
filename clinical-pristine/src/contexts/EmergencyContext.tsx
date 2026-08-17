/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { useToast } from './ToastContext';
import { db } from '../db';

interface EmergencyContextType {
  isCodeBlue: boolean;
  codeBlueRoom: string;
  codeBlueSeconds: number;
  epinephrineCountdown: number; // 180s cycle
  shocksDelivered: number;
  triggerCodeBlue: (location?: string) => void;
  standDownCodeBlue: () => void;
  deliverShock: () => void;
  administerEpi: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export function EmergencyProvider({ children }: { children: ReactNode }) {
  const [isCodeBlue, setIsCodeBlue] = useState(false);
  const [codeBlueRoom, setCodeBlueRoom] = useState('ICU Room 104');
  const [codeBlueSeconds, setCodeBlueSeconds] = useState(0);
  const [epinephrineCountdown, setEpinephrineCountdown] = useState(180);
  const [shocksDelivered, setShocksDelivered] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const { showToast } = useToast();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const alarmIntervalRef = useRef<number | null>(null);

  // Web Audio API Synthesizer for Authentic Hospital Dual-Tone Siren
  const playSirenBeep = () => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch A5
      osc.frequency.exponentialRampToValueAtTime(587.33, ctx.currentTime + 0.25); // Drop to D5
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {
      console.warn('Audio synthesis uninitialized:', e);
    }
  };

  // Stopwatch effect during Code Blue
  useEffect(() => {
    let timer: number | null = null;
    if (isCodeBlue) {
      // Play initial burst
      playSirenBeep();
      
      // Repeating dual-tone alarm every 2.5s
      alarmIntervalRef.current = window.setInterval(() => {
        playSirenBeep();
      }, 2500);

      timer = window.setInterval(() => {
        setCodeBlueSeconds(prev => prev + 1);
        setEpinephrineCountdown(prev => (prev > 0 ? prev - 1 : 180));
      }, 1000);
    } else {
      if (alarmIntervalRef.current) clearInterval(alarmIntervalRef.current);
      if (timer) clearInterval(timer);
    }

    return () => {
      if (alarmIntervalRef.current) clearInterval(alarmIntervalRef.current);
      if (timer) clearInterval(timer);
    };
  }, [isCodeBlue, isMuted]);

  const triggerCodeBlue = (location = 'ICU Room 104') => {
    setCodeBlueRoom(location);
    setCodeBlueSeconds(0);
    setEpinephrineCountdown(180);
    setShocksDelivered(0);
    setIsCodeBlue(true);
    showToast(`CODE BLUE ACTIVATED: Cardiac Arrest at ${location}! Emergency Resuscitation Team Dispatched.`, 'error');

    // Record in database alert log
    db.alerts.add({
      id: `ALERT-${Date.now()}`,
      type: 'critical',
      title: `CODE BLUE — ${location}`,
      message: 'Cardiac arrest protocol activated. Crash cart and ACLS team required immediately.',
      location,
      timestamp: new Date().toLocaleTimeString(),
      acknowledged: false
    }).catch(() => {});
  };

  const standDownCodeBlue = () => {
    setIsCodeBlue(false);
    showToast(`Code Blue stood down for ${codeBlueRoom}. Resuming standard hospital telemetry.`, 'success');
  };

  const deliverShock = () => {
    setShocksDelivered(prev => prev + 1);
    showToast(`Defibrillator Shock #${shocksDelivered + 1} logged at 200J Biphasic. Resume CPR immediately.`, 'warn');
  };

  const administerEpi = () => {
    setEpinephrineCountdown(180);
    showToast('Epinephrine 1mg IV/IO administered. Next cycle countdown reset (3:00).', 'info');
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    showToast(isMuted ? 'Alarm audio unmuted.' : 'Alarm audio silenced.', 'info');
  };

  return (
    <EmergencyContext.Provider value={{ 
      isCodeBlue, 
      codeBlueRoom, 
      codeBlueSeconds, 
      epinephrineCountdown, 
      shocksDelivered, 
      triggerCodeBlue, 
      standDownCodeBlue, 
      deliverShock, 
      administerEpi,
      isMuted,
      toggleMute
    }}>
      {children}
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = useContext(EmergencyContext);
  if (context === undefined) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
}
