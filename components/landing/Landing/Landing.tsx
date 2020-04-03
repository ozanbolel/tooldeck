import * as React from "react";
import css from "./Landing.module.scss";
import Topbar from "../Topbar/Topbar";
import Header from "../Header/Header";
import Promote from "../Promote/Promote";
import LandingFooter from "../LandingFooter/LandingFooter";

const Landing: React.FC = () => {
  const [isGithubClicked, setIsGithubClicked] = React.useState(false);
  const [isTwitterClicked, setIsTwitterClicked] = React.useState(false);

  const controller = { isGithubClicked, setIsGithubClicked, isTwitterClicked, setIsTwitterClicked };

  return (
    <div className={css.landing}>
      <Topbar controller={controller} />

      <Header controller={controller} />

      <div className={css.promote}>
        <Promote />
      </div>

      <LandingFooter />
    </div>
  );
};

export default Landing;
