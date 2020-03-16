import * as React from "react";
import { Nest } from "core/elements";
import { TPage } from "core/types";

import HomeLayout from "layouts/HomeLayout/HomeLayout";
import Deck from "components/home/Deck/Deck";

const IndexPage: TPage = () => {
  return (
    <Nest noVerticalPadding>
      <Deck />
    </Nest>
  );
};

IndexPage.Layout = HomeLayout;

export default IndexPage;
