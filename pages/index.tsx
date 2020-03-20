import * as React from "react";
import { TPage } from "core/types";
import Index from "components/landing/Index/Index";
import { useRouter } from "next/router";

const IndexPage: TPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    const login = localStorage.getItem("LOGIN");

    if (login) {
      router.replace("/deck");
    }
  }, []);

  return <Index />;
};

export default IndexPage;
