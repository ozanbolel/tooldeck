import * as React from "react";
import css from "./Index.module.scss";
import { oauth } from "core/config";
import { hmacsign } from "./xx";
import fetch from "isomorphic-fetch";

const variables = {
  TWITTER_API_KEY: "hQuC1wx9YQETTKjrAjcKWAN5j",
  TWITTER_SECRET_KEY: "PRCVaknKyXjsP9scaH9B37qiyuuaRaN9bjKWyJKcGi8T0c3hsr"
};

const Index: React.FC = () => {
  const onClickGithub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${oauth.github.clientId}`;
  };

  const onClickTwitter = async () => {
    const url = "https://api.twitter.com/oauth/request_token";

    const method = "POST";

    const params = {
      oauth_nonce: "nonce" + new Date().getTime(),
      oauth_callback: encodeURIComponent("https://tooldeck.now.sh/auth/twitter"),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: new Date().getTime(),
      oauth_consumer_key: variables.TWITTER_API_KEY,
      oauth_version: "1.0"
    };

    const signed = hmacsign(method, url, params, variables.TWITTER_SECRET_KEY);

    console.log(signed);

    const authorizationString =
      "OAuth " +
      `oauth_nonce="${"nonce" + new Date().getTime()}", ` +
      `oauth_callback="${encodeURIComponent("https://tooldeck.now.sh/auth/twitter")}", ` +
      `oauth_signature_method="HMAC-SHA1", ` +
      `oauth_timestamp="${new Date().getTime()}", ` +
      `oauth_consumer_key="${variables.TWITTER_API_KEY}", ` +
      `oauth_signature="${encodeURIComponent(signed)}", ` +
      `oauth_version="1.0"`;

    const response = await fetch(url + "?oauth_callback=https://tooldeck.now.sh/auth/twitter", {
      method,
      headers: { Authorization: authorizationString }
    });

    console.log(response);
  };

  return (
    <div>
      <button className={css.withGithub} onClick={() => onClickGithub()}>
        Login with GitHub
      </button>

      <button className={css.withGithub} onClick={() => onClickTwitter()}>
        Login with Twitter
      </button>
    </div>
  );
};

export default Index;
