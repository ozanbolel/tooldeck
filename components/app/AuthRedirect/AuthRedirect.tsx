import * as React from "react";
import css from "./AuthRedirect.module.scss";

type TAuthRedirect = React.FC<{
  serviceName: string;
}>;

const AuthRedirect: TAuthRedirect = ({ serviceName }) => {
  return (
    <div className={css.container}>
      <div className={css.inner}>
        <div className={css.innerText}>Logging In with {serviceName}</div>

        <div className={css.innerSpinner}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">
            <defs>
              <linearGradient id="gradient" x1="8.042%" y1="0%" x2="65.682%" y2="23.865%">
                <stop stopColor="#f5cb5c" stopOpacity="0" offset="0%" />
                <stop stopColor="#f5cb5c" stopOpacity=".631" offset="63.146%" />
                <stop stopColor="#f5cb5c" offset="100%" />
              </linearGradient>
            </defs>

            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)">
                <path d="M36 18c0-9.94-8.06-18-18-18" stroke="url(#gradient)" strokeWidth="3"></path>
                <circle fill="#f5cb5c" cx="36" cy="18" r="1"></circle>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AuthRedirect;
