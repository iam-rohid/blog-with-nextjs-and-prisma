import { GetServerSideProps } from "next";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import React, { FC, useState } from "react";

type Props = {
  providers: any;
  csrfToken: string;
};

const SingInPage: FC<Props> = ({ providers, csrfToken }) => {
  const [email, setEmail] = useState("");

  return (
    <main className="py-16 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-8 mx-auto rounded-xl">
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn("email", { email });
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@example.com"
            className="h-12 px-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="h-12 px-4 flex items-center justify-center font-medium bg-primary-500 text-white rounded-lg"
          >
            Continue with Email
          </button>
        </form>

        <p className="text-center py-8 opacity-50">Or</p>

        <div className="flex flex-col gap-4">
          {Object.values(providers).map(
            (provider: any) =>
              provider.type === "oauth" && (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="h-12 px-4 flex items-center justify-center font-medium border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 rounded-lg"
                >
                  Continue with {provider.name}
                </button>
              )
          )}
        </div>
      </div>
    </main>
  );
};
export default SingInPage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);
  console.log({ session });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { providers, csrfToken },
  };
};
