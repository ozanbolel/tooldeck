import * as React from "react";
import css from "./Topbar.module.scss";
import LoginButtons, { TLoginButtonsController } from "../LoginButtons/LoginButtons";

const Topbar: React.FC<{ controller: TLoginButtonsController }> = ({ controller }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const header = document.getElementById("header");

    if (header) {
      const headerCR = header.getBoundingClientRect();

      const scrollOps = () => {
        const { scrollY } = window;

        if (scrollY >= headerCR.height * 0.75) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      scrollOps();

      window.addEventListener("scroll", scrollOps);
      return () => window.removeEventListener("scroll", scrollOps);
    }
  }, []);

  return (
    <div className={css.topbar}>
      <div onClick={() => window.scroll({ top: 0 })}>
        <img src="/favicon.png" className={css.logo} draggable="false" />
      </div>

      <div className={css.loginButtons + (isScrolled ? " " + css.show : "")}>
        <LoginButtons controller={controller} />
      </div>
    </div>
  );
};

export default Topbar;
