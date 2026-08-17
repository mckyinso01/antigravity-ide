/* eslint-disable react-refresh/only-export-components */
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
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl min-w-[320px] max-w-[420px] bg-white font-sans ${
                toast.type === 'success' 
                  ? 'border-slate-200 border-l-4 border-l-emerald-500 text-slate-800'
                  : toast.type === 'error'
                  ? 'border-slate-200 border-l-4 border-l-rose-500 text-slate-900'
                  : toast.type === 'warn'
                  ? 'border-slate-200 border-l-4 border-l-amber-500 text-slate-800'
                  : 'border-slate-200 border-l-4 border-l-blue-600 text-slate-800'
              }`}
            >
              <div className="shrink-0">
                {toast.type === 'success' && <CheckCircle2 className="text-emerald-600" size={20} />}
                {toast.type === 'error' && <AlertCircle className="text-rose-600" size={20} />}
                {toast.type === 'warn' && <AlertCircle className="text-amber-600" size={20} />}
                {toast.type === 'info' && <Info className="text-blue-600" size={20} />}
              </div>
              
              <span className="flex-1 text-xs font-semibold leading-snug">{toast.message}</span>
              
              <button 
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-700 cursor-pointer"
                title="Dismiss Notification"
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
