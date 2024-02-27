import { Request, Response } from "express";
import Joi from "joi";

import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from "@nestjs/common";
import { Validator } from "./validator";
import { Observable } from "rxjs";

export interface RequestValidationSchema {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  headers?: Joi.ObjectSchema;
}

export const buildValidator = (
  schema: RequestValidationSchema,
): RequestValidationSchema => schema;

@Injectable()
export class ValidationInterceptor implements NestInterceptor<any> {
  public constructor(private schema: RequestValidationSchema) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<Request>();

    const input = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    const validator = new Validator(Joi.object(this.buildSchema()));

    const result = validator.validate<any>(input);

    req.body = result.body;
    req.params = result.params;
    req.query = result.query;
    req.headers = result.headers;

    return next.handle();
  }

  private buildSchema(): RequestValidationSchema {
    return {
      ...this.schema,
      headers: (this.schema.headers || Joi.object()).unknown(true),
    };
  }
}
