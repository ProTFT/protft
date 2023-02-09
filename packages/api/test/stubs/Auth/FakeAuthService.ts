import { Response } from "express";

export class FakeAuthService {
  public login(_: any, res: Response) {
    return res;
  }

  public validateUser() {
    return undefined;
  }

  public logout(res: Response) {
    return res;
  }
}
