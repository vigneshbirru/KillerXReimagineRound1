'use client';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <button onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
      <ArrowRightOnRectangleIcon className="h-4" />
      <span>Sign Out</span>
    </button>
  );
};

export default SignOutButton;
