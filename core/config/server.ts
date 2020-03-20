import { isProduction } from "./isProduction";

export const server = {
  uri: isProduction ? "https://tooldeck-api.now.sh/api" : "http://localhost:4000/api"
};
