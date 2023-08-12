import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable, of, tap } from "rxjs";
import { CacheService } from "./cache.service";
import { CacheKey, GraphqlQueryContext } from "./cache.types";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CacheService) private cacheService: CacheService,
    private reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    try {
      const ctx = GqlExecutionContext.create(context) as GraphqlQueryContext;
      const labelOrLabelFunction = this.reflector.get<CacheKey>(
        "cacheKey",
        context.getHandler(),
      );
      const label =
        labelOrLabelFunction instanceof Function
          ? labelOrLabelFunction(ctx)
          : labelOrLabelFunction;
      const { body } = ctx.getContext().req;
      const cacheKey = `${body.query}-${JSON.stringify(body.variables)}`;
      const result = await this.cacheService.get(cacheKey);

      if (result) {
        return of(JSON.parse(result.value));
      }
      return next.handle().pipe(
        tap(async (response) => {
          try {
            await this.cacheService.set(
              cacheKey,
              JSON.stringify(response),
              label,
            );
          } catch (error) {
            console.log("Error while setting cache", error);
          }
        }),
      );
    } catch (error) {
      console.log("Error during cache handling", error);
      return next.handle();
    }
  }
}
