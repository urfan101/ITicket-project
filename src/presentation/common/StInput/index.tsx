import styles from './input.module.scss'
import { FC, memo, ReactNode } from 'react';
import { Input, InputProps } from 'react-aria-components';

type StInputProps = InputProps & {
  children?: ReactNode;
  className?: string;
};

const StInput: FC<StInputProps> = ({ children, className = '', ...props }) => {
  return (
    <div className={styles.input}>
      {children}
      <Input {...props}/>
    </div>
  );
};

type StInputAddonLeftProps = {
  children: ReactNode;
};

const StInputAddonRight: FC<StInputAddonLeftProps> = memo(({ children }) => {
  return <div className="absolute right-2 top-1/2 -translate-x-1/2">{children}</div>;
});

type InputErrorProps = {
  children: ReactNode;
};

export const InputError: FC<InputErrorProps> = memo(({ children }) => {
  return <span style={{color: "red"}}>{children}</span>;
});

export default memo(StInput);
export { StInputAddonRight };