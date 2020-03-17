import * as React from "react";
import { Nest } from "core/elements";
import { TPage } from "core/types";

import HomeLayout from "layouts/HomeLayout/HomeLayout";
import Deck from "components/home/Deck/Deck";

const DeckPage: TPage = () => {
  return (
    <Nest noVerticalPadding>
      <Deck />
    </Nest>
  );
};

DeckPage.Layout = HomeLayout;

export default DeckPage;
