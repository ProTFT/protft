import { BaseEntity } from "../../src/lib/BaseEntity";

export const BaseProps = (props?: Partial<BaseEntity>): BaseEntity => ({
  createdAt: new Date(),
  createdBy: "",
  deletedAt: new Date(),
  deletedBy: "",
  updatedAt: new Date(),
  updatedBy: "",
  ...props,
});
