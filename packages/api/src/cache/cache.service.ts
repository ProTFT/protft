import { DynamoDBClient, WriteRequest } from "@aws-sdk/client-dynamodb";
import { Injectable } from "@nestjs/common";
import { DynamoDBDocument, PutCommandOutput } from "@aws-sdk/lib-dynamodb";
import { ConfigService } from "@nestjs/config";
import { getAwsConfig } from "../config/aws";

@Injectable()
export class CacheService {
  private readonly TABLE_NAME = "ptft_cache";

  private dynamoDbClient: DynamoDBDocument;
  constructor(private configService: ConfigService) {
    const environment = this.configService.get<string>("NODE_ENV");
    const params = getAwsConfig(environment);
    const client = new DynamoDBClient(params);
    this.dynamoDbClient = DynamoDBDocument.from(client);
  }

  public async get(key: string): Promise<Record<string, any> | undefined> {
    const result = await this.dynamoDbClient.get({
      TableName: this.TABLE_NAME,
      Key: {
        key,
      },
    });
    return result.Item;
  }

  public async set(
    key: string,
    value: string,
    label: string,
  ): Promise<PutCommandOutput> {
    return this.dynamoDbClient.put({
      TableName: this.TABLE_NAME,
      Item: {
        key,
        value,
        label,
      },
    });
  }

  public async delete(label: string): Promise<any> {
    const entriesToDelete = await this.dynamoDbClient.scan({
      TableName: this.TABLE_NAME,
      IndexName: "label-index",
      FilterExpression: "label = :label",
      ExpressionAttributeValues: {
        ":label": label,
      },
    });
    const itemsToDelete: WriteRequest[] = entriesToDelete.Items.map((item) => ({
      DeleteRequest: {
        Key: {
          key: item.key,
        },
      },
    }));

    if (!itemsToDelete.length) {
      return;
    }

    return this.dynamoDbClient.batchWrite({
      RequestItems: {
        ptft_cache: itemsToDelete,
      },
    });
  }
}
