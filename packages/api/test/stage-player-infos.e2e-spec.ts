import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import request from "supertest";
import { JwtAuthGuard } from "../src/auth/jwt-auth.guard";
import { StagePlayerInfosController } from "../src/stage-player-infos/stage-player-infos.controller";
import { StagePlayerInfosService } from "../src/stage-player-infos/stage-player-infos.service";

const fakeStagePlayerInfosService = {
  createTiebreakerBulk: jest.fn(),
};

describe("Stage Player Infos (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [StagePlayerInfosService],
      controllers: [StagePlayerInfosController],
    })
      .overrideProvider(StagePlayerInfosService)
      .useValue(fakeStagePlayerInfosService)
      .overrideGuard(JwtAuthGuard)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe("uploadTiebreakerListBulk", () => {
    it("should return bad request if no file is provided", async () => {
      await request(app.getHttpServer())
        .post("/stagePlayerInfos/uploadTiebreakerListBulk")
        .send()
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should call service", async () => {
      await request(app.getHttpServer())
        .post("/stagePlayerInfos/uploadTiebreakerListBulk")
        .field("stageId", "10")
        .attach("file", "test/data/fakeFile.csv")
        .expect(HttpStatus.CREATED);

      expect(
        fakeStagePlayerInfosService.createTiebreakerBulk,
      ).toHaveBeenCalledWith("test\n", 10);
    });
  });
});
