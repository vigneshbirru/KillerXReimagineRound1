import { FC, ReactNode } from 'react';
const Filter = () => {
  return <div>Filter</div>;
};

interface ButtonProps {
  filter: string;
  handleFilter: Function;
  activeFilter: Function;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  filter,
  handleFilter,
  activeFilter,
  children,
}) => {
  return <button className={`px-5 `}></button>;
};

export default Filter;
