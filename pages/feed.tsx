import * as React from "react";
import { TPage } from "core/types";
import HomeLayout from "layouts/HomeLayout/HomeLayout";
import Feed from "components/home/Feed/Feed";

const FeedPage: TPage = () => {
  return <Feed />;
};

FeedPage.Layout = HomeLayout;

export default FeedPage;
