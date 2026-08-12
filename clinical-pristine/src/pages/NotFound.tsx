import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#050811] font-sans p-6">
      
      {/* Graphic */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative mb-8 flex flex-col items-center text-center"
      >
        <div className="absolute inset-0 bg-[#2563EB]/10 blur-3xl rounded-full w-48 h-48 m-auto"></div>
        <div className="w-24 h-24 bg-[#0B1C30]/80 border border-slate-700 rounded-2xl shadow-[0_0_50px_rgba(37,99,235,0.15)] flex items-center justify-center relative z-10 rotate-12 hover:rotate-0 transition-transform duration-500">
           <Compass size={48} className="text-[#2563EB] animate-pulse" />
        </div>
        
        <h1 className="text-6xl font-bold text-white mt-8 tracking-tighter shadow-black drop-shadow-xl">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-300 mt-2">Route Not Found</h2>
        <p className="text-slate-400 mt-4 max-w-md text-sm leading-relaxed">
          The module or diagnostic route you are attempting to access does not exist within the Clinical Pristine OS environment.
        </p>
      </motion.div>

      {/* Action */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-6 py-3 bg-[#2563EB]/10 hover:bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/50 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] active:scale-95"
      >
        <Home size={18} />
        Return to Command Center
      </motion.button>
      
    </div>
  );
};
