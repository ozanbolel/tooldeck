import { isProduction } from "./isProduction";

export const server = {
  uri: isProduction ? "https://api.tooldeckhq.com" : "http://localhost:4000"
};
