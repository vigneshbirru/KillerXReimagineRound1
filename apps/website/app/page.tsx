import Link from 'next/link';

const page = () => {
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
