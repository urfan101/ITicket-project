import { FC, HTMLAttributes, isValidElement } from 'react';
import { Children } from 'react';

type ListProps = HTMLAttributes<HTMLUListElement>;

const List: FC<ListProps> = props => {
  const { children, ...rest } = props;

  // Now I have to clone all children and wrap them with li tag
  const childrenWithLi = Children.toArray(children).map((child, i) => {
    const key = isValidElement(child) && child.key ? child.key : i;

    return <li key={key}>{child}</li>;
  });

  return <ul {...rest}>{childrenWithLi}</ul>;
};

export default List;
