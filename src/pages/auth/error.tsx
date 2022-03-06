import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React from "react";

const ErrorPage = () => {
  return <div>ErrorPage</div>;
};

export default ErrorPage;

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
