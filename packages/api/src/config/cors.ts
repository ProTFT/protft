import { isProd } from "./environment";

const amateurSubdomain = "roadto";

const prodPaths = [
  "https://www.protft.com",
  "https://protft.com",
  `https://${amateurSubdomain}.protft.com`,
  `https://www.${amateurSubdomain}.protft.com`,
];

export const getOrigin = (environment: string) => {
  return isProd(environment) ? prodPaths : "http://protft.com:3000";
};
