import * as React from "react";
import css from "./AuthRedirect.module.scss";
import { Loading, Icon } from "core/elements";
import { useRouter } from "next/router";

type TAuthRedirect = React.FC<{
  serviceName: string;
  isLoaded: boolean;
}>;

const AuthRedirect: TAuthRedirect = ({ serviceName, isLoaded }) => {
  const router = useRouter();

  if (isLoaded) {
    setTimeout(() => router.push("/deck"), 800);
  }

  return (
    <div className={css.container}>
      <div className={css.tile + (isLoaded ? " " + css.outro : "")}>
        <div className={css.tileShade} />
      </div>

      <div className={css.inner + (isLoaded ? " " + css.outro : "")}>
        <img src="/static/logo/logo-192.png" className={css.innerLogo} draggable="false" />

        <Loading className={css.innerLoading} />

        <Icon name={serviceName} className={css.innerService} />
      </div>
    </div>
  );
};

export default AuthRedirect;
