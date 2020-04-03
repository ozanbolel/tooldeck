import * as React from "react";
import { TPage } from "core/types";
import { useRouter } from "next/router";
import Landing from "components/landing/Landing/Landing";

const LandingPage: TPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    const login = localStorage.getItem("LOGIN");

    if (login) {
      router.replace("/deck");
    }
  }, []);

  return <Landing />;
};

export default LandingPage;
