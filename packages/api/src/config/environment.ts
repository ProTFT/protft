export enum Environments {
  Production = "production",
}

export const isProd = (environment: string) =>
  environment === Environments.Production;
