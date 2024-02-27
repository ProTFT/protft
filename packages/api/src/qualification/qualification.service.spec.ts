import { Test, TestingModule } from "@nestjs/testing";
import { QualificationService } from "./qualification.service";

describe("QualificationService", () => {
  let service: QualificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualificationService],
    }).compile();

    service = module.get<QualificationService>(QualificationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
