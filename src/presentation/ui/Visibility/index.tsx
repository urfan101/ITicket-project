import type { FC, ReactElement, ReactNode } from 'react';
import { cloneElement, isValidElement, useState } from 'react';

import { useVisibility, VisibilityContext } from './VisibilityContext.tsx';

const VisibilityProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});

  const open = (key: string) => {
    setVisibility(prev => ({
      ...prev,
      [key]: true,
    }));
  };

  const close = (key: string) => {
    setVisibility(prev => ({
      ...prev,
      [key]: false,
    }));
  };

  const toggle = (key: string) => {
    setVisibility(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <VisibilityContext.Provider value={{ visibility, open, close, toggle }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export const VisibilityTarget: FC<{ children: ReactNode; visibleKey: string }> = ({
  children,
  visibleKey,
}) => {
  const { visibility } = useVisibility();
  return visibility[visibleKey] ? <>{children}</> : null;
};

export const VisibilityOpen: FC<{ children: ReactNode; visibleKey: string }> = ({
  children,
  visibleKey,
}) => {
  const { open } = useVisibility();
  const handleClick = (event: MouseEvent) => {
    if (isValidElement(children) && children.props.onClick) {
      children.props.onClick(event);
    }

    open(visibleKey);
  };

  return cloneElement(children as ReactElement, { onClick: handleClick });
};

export const VisibilityClose: FC<{ children: ReactNode; visibleKey: string }> = ({
  children,
  visibleKey,
}) => {
  const { close } = useVisibility();
  const handleClick = (event: MouseEvent) => {
    if (isValidElement(children) && children.props.onClick) {
      children.props.onClick(event);
    }

    close(visibleKey);
  };

  return cloneElement(children as ReactElement, { onClick: handleClick });
};

export const VisibilityToggle: FC<{ children: ReactNode; visibleKey: string }> = ({
  children,
  visibleKey,
}) => {
  const { toggle } = useVisibility();
  const handleClick = (event: MouseEvent) => {
    if (isValidElement(children) && children.props.onClick) {
      children.props.onClick(event);
    }
    toggle(visibleKey);
  };
  return cloneElement(children as ReactElement, { onClick: handleClick });
};

export default VisibilityProvider;
