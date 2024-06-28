import { db } from '@repo/db/client';
import { FC } from 'react';

interface pageProps {
  params: {
    cabinId: string;
  };
}

const getCabin = async (id: string) => {
  const cabin = await db.cabins.findFirst({ where: { id } });
  return cabin;
};

const page: FC<pageProps> = async ({ params }) => {
  const { cabinId } = params;
  const cabin = await getCabin(cabinId);
  console.log(cabin);
  return <div>{cabinId}</div>;
};

export default page;
