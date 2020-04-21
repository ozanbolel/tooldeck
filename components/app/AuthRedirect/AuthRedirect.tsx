import * as React from "react";
import css from "./AuthRedirect.module.scss";
import { Loading } from "core/elements";
import { useRouter } from "next/router";

type TAuthRedirect = React.FC<{
  serviceName: string;
  isLoaded: boolean;
}>;

const AuthRedirect: TAuthRedirect = ({ serviceName, isLoaded }) => {
  const router = useRouter();

  if (isLoaded) {
    setTimeout(() => router.push("/deck"), 400);
  }

  return (
    <div className={css.container}>
      <div className={css.inner + (isLoaded ? " " + css.outro : "")}>
        <div className={css.innerText}>Logging In with {serviceName}</div>
        <Loading className={css.innerLoading} />
      </div>
    </div>
  );
};

export default AuthRedirect;
