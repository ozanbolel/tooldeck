import { isProduction } from "./isProduction";

export const server = {
  uri: isProduction ? "https://tooldeck-api.herokuapp.com/api" : "http://localhost:4000/api"
};
