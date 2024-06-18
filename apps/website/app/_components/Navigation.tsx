import Image from 'next/image';
import Link from 'next/link';

const Navigation = () => {
  return (
    <div>
      {/* <Image src="/public/logo.png" width={100} height={100} alt="logo" /> */}
      <Link href="/">The Wild Oasis</Link>

      <ul>
        <li>
          <Link href="/cabins">Cabins</Link>
        </li>

        <li>
          <Link href="/about">About</Link>
        </li>

        <li>
          <Link href="/account">Guest area</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
