import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8FAFC] font-sans p-6">
      
      {/* Graphic */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative mb-8 flex flex-col items-center text-center max-w-md bg-white border border-slate-200 p-8 rounded-3xl shadow-sm"
      >
        <div className="w-20 h-20 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-center relative z-10 rotate-6 hover:rotate-0 transition-transform duration-500 mb-4">
           <Compass size={40} className="text-blue-600 animate-pulse" />
        </div>
        
        <h1 className="text-5xl font-bold text-slate-900 tracking-tight font-display">
          404
        </h1>
        <h2 className="text-xl font-bold text-slate-800 mt-2 font-display">Route Not Found</h2>
        <p className="text-slate-500 mt-3 text-xs leading-relaxed font-mono">
          The clinical telemetry module or route you are attempting to access does not exist within the Clinical Pristine OS environment.
        </p>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => navigate('/')}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
        >
          <Home size={16} />
          Return to Command Center
        </motion.button>
      </motion.div>
      
    </div>
  );
};
