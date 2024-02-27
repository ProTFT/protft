import { ClsService } from "nestjs-cls";
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";

@EventSubscriber()
export class BaseEntitySubscriber
  implements EntitySubscriberInterface<BaseEntity>
{
  constructor(
    private readonly connection: Connection,
    private readonly cls: ClsService,
  ) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return BaseEntity;
  }

  beforeInsert(event: InsertEvent<BaseEntity>) {
    event.entity.createdBy = this.cls.get("user.userId");
  }

  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    event.entity.updatedBy = this.cls.get("user.userId");
  }
}
