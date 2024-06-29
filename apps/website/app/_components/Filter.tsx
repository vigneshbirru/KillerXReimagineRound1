'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, ReactNode } from 'react';
const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>

      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guests
      </Button>

      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
};

interface ButtonProps {
  filter: string;
  handleFilter: Function;
  activeFilter: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  filter,
  handleFilter,
  activeFilter,
  children,
}) => {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-800 transition-all duration-200 ${filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
};

export default Filter;
