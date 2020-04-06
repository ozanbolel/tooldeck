import * as React from "react";
import { TPage } from "core/types";
import { useRouter } from "next/router";
import Landing from "components/landing/Landing/Landing";
import Head from "next/head";

const LandingPage: TPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    const login = localStorage.getItem("LOGIN");

    if (login) {
      router.replace("/deck");
    }
  }, []);

  return (
    <>
      <Head>
        <title>ToolDeck - Launchpad for your favorite tools.</title>
      </Head>

      <Landing />
    </>
  );
};

export default LandingPage;
