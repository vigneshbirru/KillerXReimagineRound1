import { NextPage } from 'next';
import Filter from '../_components/Filter';
import CabinList from '../_components/CabinList';
import { Suspense } from 'react';
import Spinner from '../_components/Spinner';

interface PageProps {
  searchParams: {
    capacity?: string;
  };
}

const Page: NextPage<PageProps> = ({ searchParams }) => {
  const filter = searchParams?.capacity ?? 'all';
  return (
    <div>
      <div>
        <h1>Our Luxury Cabins</h1>
        <p>
          Cozy yet luxurious cabins, located right in the heart of the Italian
          Dolomites. Imagine waking up to beautiful mountain views, spending
          your days exploring the dark forests around, or just relaxing in your
          private hot tub under the stars. Enjoy nature's beauty in your own
          little home away from home. The perfect spot for a peaceful, calm
          vacation. Welcome to paradise.
        </p>
      </div>
      <Filter />
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList capacity={filter} />
      </Suspense>
    </div>
  );
};

export default Page;
