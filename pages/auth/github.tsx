import * as React from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/react-hooks";
import { useDialog } from "core/tools";
import { TPage } from "core/types";
import { LOGIN_WITH_GITHUB } from "core/mutations";

const GithubRedirect: TPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const [loginWithGithub, { data, error }] = useMutation(LOGIN_WITH_GITHUB, { variables: { code } });
  const dialog = useDialog();

  React.useEffect(() => {
    if (code) {
      loginWithGithub();
    }
  }, [code]);

  React.useEffect(() => {
    if (data) {
      localStorage.setItem("LOGIN", new Date().getTime().toString());

      router.replace("/deck");
    }
  }, [data]);

  React.useEffect(() => {
    if (error) {
      console.log(error);
      dialog("Sorry, we couldn’t log you in.", { label: "Ok", highlight: true });

      router.replace("/");
    }
  }, [error]);

  return null;
};

export default GithubRedirect;
