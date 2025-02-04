import { Children, cloneElement, JSXElementConstructor, ReactElement, useMemo } from 'react';

export const useClonedChild = (
  child: ReactElement<JSXElementConstructor<never>>,
  childProps: object,
) => {
  const memoizedChildProps = useMemo(
    () => childProps,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.keys(childProps).concat(Object.values(childProps)),
  );

  return useMemo(
    () => cloneElement(Children.only(child), memoizedChildProps),
    [child, memoizedChildProps],
  );
};
