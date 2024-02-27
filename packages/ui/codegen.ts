import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3001/graphql",
  documents: ["src/**/*.ts?(x)"],
  debug: false,
  config: {
    skipTypename: true,
  },
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};

export default config;
