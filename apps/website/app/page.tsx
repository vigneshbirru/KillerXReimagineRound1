import Link from 'next/link';
import { getAuthSession } from './_lib/auth';
import Image from 'next/image';
import bg from '@/public/bg.png';

const page = async () => {
  const session = await getAuthSession();
  console.log(session);
  return (
    <main className="mt-24">
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to pear-a-dice
        </h1>
        <Link
          href="/cabins"
          className="px-8 bg-accent-500 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
};

export default page;
