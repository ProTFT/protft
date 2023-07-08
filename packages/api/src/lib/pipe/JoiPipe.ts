import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";
import { ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      console.log(error);
      throw new BadRequestException("Validation failed");
    }
    return value;
  }
}
