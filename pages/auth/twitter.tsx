import * as React from "react";
import { TPage } from "core/types";
import AuthRedirect from "components/app/AuthRedirect/AuthRedirect";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_WITH_TWITTER } from "core/mutations";
import { useRouter } from "next/router";
import { useDialog } from "core/tools";

const TwitterRedirect: TPage = () => {
  const router = useRouter();
  const { oauth_token, oauth_verifier } = router.query;
  const [loginWithTwitter, { data, error }] = useMutation(LOGIN_WITH_TWITTER, { variables: { oauth_token, oauth_verifier } });
  const dialog = useDialog();

  React.useEffect(() => {
    if (oauth_token && oauth_verifier) {
      loginWithTwitter();
    }
  }, [oauth_token, oauth_verifier]);

  React.useEffect(() => {
    if (data) {
      localStorage.setItem("LOGIN", new Date().getTime().toString());
    }
  }, [data]);

  React.useEffect(() => {
    if (error) {
      dialog("Sorry, we couldn’t log you in. Trying again will most likely resolve the problem.", { label: "Ok", highlight: true });

      router.replace("/");
    }
  }, [error]);

  return <AuthRedirect serviceName="twitter" isLoaded={typeof data !== "undefined"} />;
};

export default TwitterRedirect;
