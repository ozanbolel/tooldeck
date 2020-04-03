import * as React from "react";
import { Nest } from "core/elements";
import { TPage } from "core/types";

import HomeLayout from "layouts/HomeLayout/HomeLayout";
import Explore from "components/home/Explore/Explore";

const ExplorePage: TPage = () => {
  return (
    <Nest>
      <Explore />
    </Nest>
  );
};

ExplorePage.Layout = HomeLayout;

export default ExplorePage;
