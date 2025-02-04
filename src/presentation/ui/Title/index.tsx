import type { FC, HTMLAttributes } from 'react';

type TitleProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const Title: FC<TitleProps> = props => {
  const { as = 'h2', children, ...rest } = props;
  const Tag = as;
  return <Tag {...rest}>{children}</Tag>;
};

export default Title;
