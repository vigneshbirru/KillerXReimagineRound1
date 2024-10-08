import Link from 'next/link';
import logo from '@/public/logo.png';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        height="60"
        quality={100}
        width="60"
        alt="The wild oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Reykjavik EDITION
      </span>
    </Link>
  );
};

export default Logo;
