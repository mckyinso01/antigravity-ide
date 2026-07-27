import React from 'react';

export default function ToastNotificationSystem({ toasts, onDismissToast }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-2xl border flex items-start justify-between gap-3 transform transition-all duration-300 animate-bounce-short ${
            t.type === 'error'
              ? 'bg-rose-950/90 text-rose-200 border-rose-700/80 backdrop-blur-md'
              : t.type === 'info'
              ? 'bg-[#145FE4]/90 text-white border-blue-500/80 backdrop-blur-md'
              : 'bg-emerald-950/90 text-emerald-200 border-emerald-700/80 backdrop-blur-md'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg">{t.type === 'error' ? '🚨' : t.type === 'info' ? 'ℹ️' : '✅'}</span>
            <div>
              <h4 className="text-xs font-bold text-white">{t.title || '1Password Alert'}</h4>
              <p className="text-[11px] opacity-90 mt-0.5 font-mono">{t.message}</p>
            </div>
          </div>

          <button
            onClick={() => onDismissToast && onDismissToast(t.id)}
            className="text-xs opacity-70 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
