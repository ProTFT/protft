import { isProd } from "./environment";

export const getAwsConfig = (environment: string) => {
  return isProd(environment)
    ? undefined
    : { endpoint: "http://127.0.0.1:4566" };
};
