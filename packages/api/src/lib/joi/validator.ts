import { Schema, ValidationOptions } from "joi";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class Validator {
  public constructor(
    private readonly schema: Schema,
    private readonly options?: ValidationOptions,
  ) {}

  public validate<T>(data: unknown): T {
    const { error, value } = this.schema.validate(data, {
      ...this.options,
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      throw new BadRequestException(error.details);
    }

    return value;
  }
}
