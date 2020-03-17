import * as React from "react";
import { useRouter } from "next/router";
import { TPage } from "core/types";

const GitHubRedirect: TPage = () => {
  const router = useRouter();
  const { code } = router.query;

  React.useEffect(() => {
    if (code) {
      console.log(code);
    }
  }, [code]);

  return null;
};

export default GitHubRedirect;
