import Cabin from '@/app/_components/Cabin';
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

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {
        //@ts-ignore
        <Cabin cabin={cabin} />
      }

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin?.name} today. Pay on arrival
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
