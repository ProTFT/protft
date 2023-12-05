import { Response } from "express";

export class FakeAuthService {
  public login(_: any, res: Response) {
    return [res, { roles: [] }];
  }

  public validateUser() {
    return undefined;
  }

  public logout(res: Response) {
    return res;
  }
}
