import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warn';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-16 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              layout
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md min-w-[300px] ${
                toast.type === 'success' 
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-100 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                  : toast.type === 'error'
                  ? 'bg-rose-950/80 border-rose-500/50 text-rose-100 shadow-[0_0_30px_rgba(225,29,72,0.15)]'
                  : toast.type === 'warn'
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-100 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                  : 'bg-[#0B1C30]/90 border-[#2563EB]/50 text-blue-100 shadow-[0_0_30px_rgba(37,99,235,0.15)]'
              }`}
            >
              <div className="shrink-0">
                {toast.type === 'success' && <CheckCircle2 className="text-emerald-400" size={20} />}
                {toast.type === 'error' && <AlertCircle className="text-rose-400" size={20} />}
                {toast.type === 'warn' && <AlertCircle className="text-amber-400" size={20} />}
                {toast.type === 'info' && <Info className="text-[#2563EB]" size={20} />}
              </div>
              
              <span className="flex-1 text-sm font-medium">{toast.message}</span>
              
              <button 
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 hover:bg-white/10 rounded-full transition-colors opacity-60 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
