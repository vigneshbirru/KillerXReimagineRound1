import Link from 'next/link';
import { getAuthSession } from './_lib/auth';

const page = async () => {
  const session = await getAuthSession();
  console.log(session);
  return (
    <div>
      <div>
        Welcome to pear-a-dice
        <button>
          <Link href="/cabins">Explore luxury cabins</Link>
        </button>
      </div>
    </div>
  );
};

export default page;
