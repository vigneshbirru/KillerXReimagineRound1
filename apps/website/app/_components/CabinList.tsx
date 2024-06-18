import { db } from '@repo/db/client';
import Link from 'next/link';
import React, { FC } from 'react';

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
    <div>
      <h1>Cabin List</h1>
      <ul>
        {cabins.map((cabin) => (
          <li key={cabin.id}>
            {cabin.name} - Capacity: {cabin.maxCapacity}
            <Link href={`/cabins/${cabin.id}`}>
              Details & reservation &rarr;
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CabinList;
