import React, { createContext, useContext, useState, useEffect } from 'react';

export type FontSizeScale = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  fontSizeScale: FontSizeScale;
  isHighContrast: boolean;
  isLowGpuMode: boolean;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  toggleHighContrast: () => void;
  toggleLowGpuMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSizeScale, setFontSizeScale] = useState<FontSizeScale>(() => {
    return (localStorage.getItem('pristine_font_scale') as FontSizeScale) || 'normal';
  });

  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('pristine_high_contrast') === 'true';
  });

  const [isLowGpuMode, setIsLowGpuMode] = useState<boolean>(() => {
    return localStorage.getItem('pristine_low_gpu') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('pristine_font_scale', fontSizeScale);
  }, [fontSizeScale]);

  useEffect(() => {
    localStorage.setItem('pristine_high_contrast', String(isHighContrast));
  }, [isHighContrast]);

  useEffect(() => {
    localStorage.setItem('pristine_low_gpu', String(isLowGpuMode));
    if (isLowGpuMode) {
      document.documentElement.setAttribute('data-low-gpu', 'true');
    } else {
      document.documentElement.removeAttribute('data-low-gpu');
    }
  }, [isLowGpuMode]);

  const increaseFontSize = () => {
    setFontSizeScale(prev => {
      if (prev === 'normal') return 'large';
      if (prev === 'large') return 'xlarge';
      return 'xlarge';
    });
  };

  const decreaseFontSize = () => {
    setFontSizeScale(prev => {
      if (prev === 'xlarge') return 'large';
      if (prev === 'large') return 'normal';
      return 'normal';
    });
  };

  const resetFontSize = () => {
    setFontSizeScale('normal');
  };

  const toggleHighContrast = () => {
    setIsHighContrast(prev => !prev);
  };

  const toggleLowGpuMode = () => {
    setIsLowGpuMode(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSizeScale,
        isHighContrast,
        isLowGpuMode,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        toggleHighContrast,
        toggleLowGpuMode
      }}
    >
      <div 
        className={`h-full w-full ${
          fontSizeScale === 'large' ? 'text-[1.08rem]' : 
          fontSizeScale === 'xlarge' ? 'text-[1.18rem]' : ''
        } ${isHighContrast ? 'contrast-125 saturate-150' : ''}`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
