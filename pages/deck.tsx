import * as React from "react";
import { TPage } from "core/types";

import HomeLayout from "layouts/HomeLayout/HomeLayout";
import Deck from "components/home/Deck/Deck";

const DeckPage: TPage = () => {
  return <Deck />;
};

DeckPage.Layout = HomeLayout;

export default DeckPage;
