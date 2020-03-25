import * as React from "react";
import css from "./AuthRedirect.module.scss";
import { Loading } from "core/elements";

type TAuthRedirect = React.FC<{
  serviceName: string;
}>;

const AuthRedirect: TAuthRedirect = ({ serviceName }) => {
  return (
    <div className={css.container}>
      <div className={css.inner}>
        <div className={css.innerText}>Logging In with {serviceName}</div>

        <Loading className={css.innerLoading} />
      </div>
    </div>
  );
};

export default AuthRedirect;
