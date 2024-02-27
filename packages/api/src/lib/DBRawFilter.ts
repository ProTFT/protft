const TODAY_IN_SQL = "CURRENT_DATE";

export const beforeToday = (alias: string) => `${alias} < ${TODAY_IN_SQL}`;
export const beforeOrToday = (alias: string) => `${alias} <= ${TODAY_IN_SQL}`;
export const afterOrToday = (alias: string) => `${alias} >= ${TODAY_IN_SQL}`;
export const afterToday = (alias: string) => `${alias} > ${TODAY_IN_SQL}`;

export const isEqualName = (alias: string) => `${alias} = name`;

export const includes = (values: string[]) => (alias: string) =>
  `${alias} && array[${values
    .map((r) => `'${r}'`)
    .join(",")}]::character varying []`;

export const includesInt = (values: number[]) => (alias: string) =>
  `${alias} && array[${values.map((r) => r).join(",")}]`;
