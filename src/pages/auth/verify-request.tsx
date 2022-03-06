import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

const VerifyRequestPage = () => {
  return (
    <main className="py-16 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 mx-auto rounded-xl">
        <h1 className="text-3xl font-bold mb-4">Check your email</h1>
        <p>A sign in link has been sent to your email address</p>
      </div>
    </main>
  );
};

export default VerifyRequestPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
