import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { db } from '@repo/db/client';
import { FC, Suspense } from 'react';

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
  return (
    <div>
      <h2>Reserver {cabin?.name} today. Pay on arrival</h2>
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
};

export default page;
