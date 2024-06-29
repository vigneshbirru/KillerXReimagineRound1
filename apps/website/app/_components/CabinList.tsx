import { db } from '@repo/db/client';
import Link from 'next/link';
import React, { FC } from 'react';
import CabinCard from './CabinCard';

interface CabinListProps {
  capacity: string;
}

async function getCabins(min: string, max: string) {
  const cabins = await db.cabins.findMany({
    where: {
      maxCapacity: {
        gte: min,
        lte: max,
      },
    },
  });
  return cabins;
}

const CabinList: FC<CabinListProps> = async ({ capacity }) => {
  let min = '0';
  let max = 'Infinity';

  switch (capacity) {
    case 'small':
      min = '0';
      max = '3';
      break;
    case 'medium':
      min = '4';
      max = '7';
      break;
    case 'large':
      min = '8';
      max = 'Infinity';
      break;
    case 'all':
    default:
      min = '0';
      max = 'Infinity';
      break;
  }

  const cabins = await getCabins(min, max);
  console.log(cabins);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
