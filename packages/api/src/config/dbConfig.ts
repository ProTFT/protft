import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { isProd } from "./environment";

const localDatabaseInfo: TypeOrmModuleOptions = {
  host: "localhost",
  port: 5432,
  username: "root",
  password: "changeme",
  database: "mydb",
};

const prodDatabaseInfo: TypeOrmModuleOptions = {
  url: process.env.DATABASE_URL,
};

export const getDatabaseInfo = (environment: string) => {
  const production = isProd(environment);
  return {
    ...(production ? prodDatabaseInfo : localDatabaseInfo),
    logging: !production,
  };
};
