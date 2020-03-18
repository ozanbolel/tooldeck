import * as React from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useDialog } from "core/tools";
import { TPage } from "core/types";

const LOGIN_WITH_GITHUB = gql`
  query($code: String) {
    loginWithGithub(code: $code) {
      name
    }
  }
`;

const GithubRedirect: TPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [loginWithGithub, { data, error }] = useLazyQuery(LOGIN_WITH_GITHUB, { variables: { code }, fetchPolicy: "no-cache" });
  const dialog = useDialog();

  React.useEffect(() => {
    if (code) {
      loginWithGithub();
    }
  }, [code]);

  React.useEffect(() => {
    if (data) {
      console.log("data:", data);
    }
  }, [data]);

  React.useEffect(() => {
    if (error) {
      dialog("Sorry, we couldn’t log you in.", { label: "Ok", highlight: true });

      router.replace("/");
    }
  }, [error]);

  return null;
};

export default GithubRedirect;
