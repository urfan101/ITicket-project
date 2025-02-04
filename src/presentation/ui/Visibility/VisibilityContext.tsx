import { createContext, useContext } from 'react';

export type VisibilityContextType = {
  visibility: Record<string, boolean>;
  open: (key: string) => void;
  close: (key: string) => void;
  toggle: (key: string) => void;
};

export const VisibilityContext = createContext<VisibilityContextType | undefined>(undefined);

export const useVisibility = (): VisibilityContextType => {
  const context = useContext(VisibilityContext);

  if (!context) {
    throw new Error('useVisibility must be used within a VisibilityProvider');
  }

  return context;
};
