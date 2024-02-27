import { ConfigService } from "@nestjs/config";
import { CacheService } from "./cache.service";
import { mockClient } from "aws-sdk-client-mock";
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";

describe("Cache service", () => {
  let service: CacheService;
  let configService: ConfigService;
  const dynamoDbMock = mockClient(DynamoDBDocumentClient);

  beforeEach(() => {
    dynamoDbMock.reset();
    configService = {
      get: () => "PROD",
    } as unknown as ConfigService;
    service = new CacheService(configService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("get", () => {
    it("should fetch data from AWS", async () => {
      const cacheValue = { id: "user1", name: "John" };
      dynamoDbMock.on(GetCommand).resolves({
        Item: cacheValue,
      });

      const result = await service.get("test");

      expect(result).toBe(cacheValue);
    });
  });

  describe("set", () => {
    it("should save data on AWS", async () => {
      const cacheValue = { id: "user1", name: "John" };
      await service.set("test", JSON.stringify(cacheValue), "label?");

      expect(dynamoDbMock.commandCalls(PutCommand)).toHaveLength(1);
    });
  });

  describe("delete", () => {
    it("should delete all the data from a specific label", async () => {
      dynamoDbMock.on(ScanCommand).resolves({
        Items: [
          {
            Key: "item-1",
          },
          {
            Key: "item-2",
          },
        ],
      });
      await service.delete("test");

      expect(dynamoDbMock.commandCalls(BatchWriteCommand)).toHaveLength(1);
    });
  });
});
