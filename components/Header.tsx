import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <header className="bg-white p-4 text-custom-green border-b border-custom-green">
      <div className="container mx-auto px-10 flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/" className="text-2xl">
            hajimari
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {status === "authenticated" ? (
              <>
                <Link href={`/profile/${session?.user?.name}`} className="flex items-center">
                  <img
                    src={session.user.image}
                    className="rounded-full w-10 h-10"
                    alt="丸いアイコン"
                  />
                  <p className="ml-4">{session.user?.name}</p>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="auth/signin"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                >
                  ログイン
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
