import { isProduction } from "./isProduction";

export const oauth = {
  github: {
    clientId: "1bb4dcdce67b173ece58",
    redirectUrl: isProduction ? "https://tooldeck.now.sh/auth/github" : "http://localhost:3000/auth/github"
  }
};
