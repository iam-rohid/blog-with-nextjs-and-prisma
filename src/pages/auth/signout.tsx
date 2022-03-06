import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignOutPage = () => {
  return (
    <main className="py-16 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 mx-auto rounded-xl">
        <h1 className="text-3xl font-bold mb-4">Sign Out</h1>
        <p className="text-lg mb-8">Are you sure you want to sign out?</p>
        <div className="flex gap-4">
          <button
            onClick={() => signOut()}
            className="flex-1 h-12 flex items-center justify-center bg-red-500 text-white rounded-lg"
          >
            Sign Out
          </button>
          <Link href={"/"}>
            <a className="flex-1 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
              Cancel
            </a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignOutPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log({ session });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
