import * as React from "react";
import css from "./AuthRedirect.module.scss";
import { Loading, Icon } from "core/elements";
import { useRouter } from "next/router";
import { isProduction } from "core/config";
import ReactGA from "react-ga";

type TAuthRedirect = React.FC<{
  serviceName: string;
  isLoaded: boolean;
}>;

const AuthRedirect: TAuthRedirect = ({ serviceName, isLoaded }) => {
  const router = useRouter();

  if (isLoaded) {
    if (isProduction) {
      ReactGA.event({ category: "User", action: "Logged In", label: serviceName });
    }

    setTimeout(() => router.push("/deck"), 600);
  }

  return (
    <div className={css.container}>
      <div className={css.tile + (isLoaded ? " " + css.outro : "")}>
        <div className={css.tileShade} />
      </div>

      <div className={css.inner + (isLoaded ? " " + css.outro : "")}>
        <img src="/static/logo/logo.svg" className={css.innerLogo} draggable="false" />

        <Loading className={css.innerLoading} />

        <Icon name={serviceName} className={css.innerService} />
      </div>
    </div>
  );
};

export default AuthRedirect;
