import * as React from "react";
import { TPage } from "core/types";

import HomeLayout from "layouts/HomeLayout/HomeLayout";
import Explore from "components/home/Explore/Explore";

const ExplorePage: TPage = () => {
  return <Explore />;
};

ExplorePage.Layout = HomeLayout;

export default ExplorePage;
