const TODAY_IN_SQL = "CURRENT_DATE";

export const beforeToday = (alias: string) => `${alias} < ${TODAY_IN_SQL}`;
export const beforeOrToday = (alias: string) => `${alias} <= ${TODAY_IN_SQL}`;
export const afterOrToday = (alias: string) => `${alias} >= ${TODAY_IN_SQL}`;
export const afterToday = (alias: string) => `${alias} > ${TODAY_IN_SQL}`;
