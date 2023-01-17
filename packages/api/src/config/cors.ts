import { isProd } from "./environment";

export const getOrigin = (environment: string) => {
  return isProd(environment)
    ? "https://www.protft.com"
    : "http://protft.com:3000";
};
