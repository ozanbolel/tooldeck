import * as React from "react";
import { TPage } from "core/types";
import { useRouter } from "next/router";
import { Nest } from "core/elements";
import Topbar from "components/landing/Topbar/Topbar";
import Header from "components/landing/Header/Header";

const LandingPage: TPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    const login = localStorage.getItem("LOGIN");

    if (login) {
      router.replace("/deck");
    }
  }, []);

  return (
    <Nest>
      <Topbar />
      <Header />
    </Nest>
  );
};

export default LandingPage;
