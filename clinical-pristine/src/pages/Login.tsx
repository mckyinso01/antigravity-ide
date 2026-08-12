import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, ShieldAlert, Loader2 } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isFullState = username.length > 0 && password.length > 0;

  // Defensive handler (Zero-Undefined Guard)
  const handleError = (rawError: unknown) => {
    if (rawError instanceof Error) {
      setErrorMsg(rawError.message || 'Authentication failed. Please check your network.');
    } else {
      setErrorMsg('Invalid credentials. Please contact IT Support.');
    }
    setIsLoading(false);
  };

  const handleLogin = async () => {
    if (!isFullState) return;
    
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Hybrid Auth Mock (Dexie local check -> simulated REST delay)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Enforce strict check to trigger error state for demo
      if (username === 'admin' && password === '123') {
        localStorage.setItem('auth_token', 'mock_token_123');
        navigate('/');
      } else {
        throw new Error('Invalid credentials provided.');
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#050811] text-slate-200 overflow-hidden font-sans">
      
      {/* LEFT PANE: Asymmetric Split Mesh Gradient */}
      <div className="relative hidden lg:flex w-1/2 h-full items-center justify-center overflow-hidden bg-black">
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-[#2563EB]/20 rounded-full blur-[100px] -top-40 -left-40"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-[#10B981]/10 rounded-full blur-[120px] bottom-0 right-0"
        />
        
        {/* Brand Lockup */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
          <div className="relative w-32 h-32 flex items-center justify-center rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-3xl border-2 border-transparent border-t-[#2563EB]/50"
            />
            <Stethoscope size={48} className="text-[#2563EB]" />
            <ShieldAlert size={20} className="absolute bottom-4 right-4 text-[#10B981]" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Clinical Pristine OS</h1>
            <p className="text-slate-400 font-mono text-sm tracking-widest uppercase">Zero-Defect Orchestration</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: Frosted Glass Form */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 p-8 sm:p-12 lg:p-24">
        
        <div className={`w-full max-w-[420px] p-8 sm:p-10 rounded-3xl bg-[#0B1C30]/80 backdrop-blur-2xl shadow-2xl transition-all duration-300 border ${
          errorMsg ? 'border-[#E11D48]/50 shadow-[0_0_20px_rgba(225,29,72,0.15)]' : 'border-slate-800/80'
        }`}>
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400 text-sm">Sign in to access the Command Center</p>
          </div>

          <AnimatePresence>
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 rounded-xl bg-[#E11D48]/10 border border-[#E11D48]/20 flex items-start space-x-3"
              >
                <ShieldAlert size={18} className="text-[#E11D48] mt-0.5 shrink-0" />
                <p className="text-sm text-red-200">{errorMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Username ID</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#050811]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/50 transition-all disabled:opacity-50"
                placeholder="e.g. admin"
              />
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                <button className="text-xs text-[#2563EB] hover:text-[#1d4ed8] transition-colors">Reset</button>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                onKeyDown={handleKeyDown}
                className="w-full bg-[#050811]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#2563EB]/50 focus:ring-1 focus:ring-[#2563EB]/50 transition-all disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <button 
              onClick={handleLogin}
              disabled={!isFullState || isLoading}
              className={`w-full mt-6 py-3.5 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 ${
                !isFullState || isLoading
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] animate-glow-pulse'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Access Terminal</span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
