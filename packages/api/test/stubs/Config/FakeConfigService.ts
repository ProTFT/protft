export const TEST_JWT = "testSecret";
export const TEST_SIGNIN = "testSignin";

export class FakeConfigService {
  private mockConfigValues = {
    JWT_SECRET: TEST_JWT,
    SIGNIN_KEY: TEST_SIGNIN,
  };

  public get(key: string): string {
    return this.mockConfigValues[key];
  }
}
