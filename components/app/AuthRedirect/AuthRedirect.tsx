import * as React from "react";
import css from "./AuthRedirect.module.scss";

const AuthRedirect: React.FC = () => {
  return (
    <div className={css.container}>
      <div className={css.inner}>
        <div className={css.innerText}>Logging you in...</div>

        <div className={css.innerSpinner}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">
            <defs>
              <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                <stop stop-color="#fff" stop-opacity="0" offset="0%" />
                <stop stop-color="#fff" stop-opacity=".631" offset="63.146%" />
                <stop stop-color="#fff" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fill-rule="evenodd">
              <g transform="translate(1 1)">
                <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" stroke-width="3"></path>
                <circle fill="#fff" cx="36" cy="18" r="1"></circle>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AuthRedirect;
