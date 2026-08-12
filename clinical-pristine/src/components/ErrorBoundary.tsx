import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#050811] text-slate-200 p-6 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-[#E11D48]/20 blur-2xl rounded-full animate-pulse"></div>
            <div className="w-24 h-24 bg-[#E11D48]/10 border border-[#E11D48]/50 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(225,29,72,0.4)]">
              <AlertTriangle size={48} className="text-[#E11D48] drop-shadow-[0_0_15px_rgba(225,29,72,0.8)]" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">System Exception</h1>
          <p className="text-slate-400 max-w-lg mb-8 leading-relaxed text-lg">
            A critical boundary fault occurred in the UI layer. The system has paused rendering to protect underlying state.
          </p>
          
          <div className="bg-[#0B1C30]/80 border border-slate-800 rounded-xl p-4 w-full max-w-2xl text-left overflow-hidden mb-8">
             <p className="text-[#E11D48] font-mono text-sm truncate">{this.state.error?.message || 'Unknown Error'}</p>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-[#2563EB]/10 hover:bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/40 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]"
          >
            <RefreshCw size={20} />
            Hard Reset Session
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
