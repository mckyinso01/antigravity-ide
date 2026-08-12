import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { useToast } from './ToastContext';

interface EmergencyContextType {
  isCodeBlue: boolean;
  toggleCodeBlue: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export function EmergencyProvider({ children }: { children: ReactNode }) {
  const [isCodeBlue, setIsCodeBlue] = useState(false);
  const { showToast } = useToast();

  const toggleCodeBlue = () => {
    setIsCodeBlue(prev => {
      const newState = !prev;
      if (newState) {
        showToast('CODE BLUE ACTIVATED: Global Emergency Override Initiated.', 'error');
      } else {
        showToast('Code Blue Stood Down. Resuming normal operations.', 'success');
      }
      return newState;
    });
  };

  return (
    <EmergencyContext.Provider value={{ isCodeBlue, toggleCodeBlue }}>
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
