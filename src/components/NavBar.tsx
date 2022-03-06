import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="h-14 w-full bg-white dark:bg-gray-800">
      <div className="px-8 flex items-center gap-4 h-full">
        <Link href="/">
          <a className="text-2xl font-medium">BlogTemplate</a>
        </Link>
        <div className="flex-1 flex items-center justify-end gap-2">
          {session ? (
            <>
              <button className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={session.user.image}
                  layout="fill"
                  objectFit="cover"
                />
              </button>
              <Link href={`/auth/signout`}>
                <a>Sign Out</a>
              </Link>
            </>
          ) : (
            <Link href="/auth/signin">
              <a>Sign In</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
