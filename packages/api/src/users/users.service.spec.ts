import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

jest.mock("bcrypt", () => ({
  compare: () => false,
  hash: () => false,
}));

describe("Users service", () => {
  let service: UsersService;

  const userRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  } as unknown as Repository<User>;

  beforeEach(() => {
    service = new UsersService(userRepository);
  });

  describe("findOne", () => {
    it("should call repository", async () => {
      const username = "user";
      await service.findOne(username);
      expect(userRepository.findOne).toHaveBeenCalledWith(
        expect.objectContaining({ where: { user: username } }),
      );
    });
  });

  describe("createOne", () => {
    it("should call repository", async () => {
      const username = "user";
      const password = "pass";
      await service.createOne(username, password);
      expect(userRepository.save).toHaveBeenCalled();
    });
  });
});
