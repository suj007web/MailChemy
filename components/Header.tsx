'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useClerk, useUser } from '@clerk/nextjs';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
const Header = () => {
  const { isSignedIn, user } = useUser();

  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative flex flex-row justify-between items-center p-4 z-50"
    >
      <div className="flex flex-row gap-2 items-center">
        <Image
          src={'/mailchemy.webp'}
          height={80}
          width={80}
          alt="logo"
          className="rounded-full"
        />
        <h1 className="text-primary-100 text-2xl font-extrabold">MailChemy</h1>
      </div>

      {isSignedIn ? (
        <div>
          <Popover>
            <PopoverTrigger>
              <Image
                src={user.imageUrl}
                className="rounded-full"
                alt="user"
                height={60}
                width={60}
              />
            </PopoverTrigger>
            <PopoverContent className="bg-black border-none rounded-md">
              <div className="flex flex-row gap-2 items-center">
                <LogOut className="text-red-400" />
                <button
                  className="text-red-400"
                  onClick={() => signOut(() => router.push('/'))}
                >
                  Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Link href={'/sign-up'}>
          <motion.button className="text-white bg-primary-200 px-4 py-2 rounded-md hover:bg-primary-300 transition ease-in-out duration-300 cursor-pointer">
            Getting Started
          </motion.button>
        </Link>
      )}
    </motion.nav>
  );
};

export default Header;
