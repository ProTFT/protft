export class FakeQueryBuilder<T> {
  public andWhereCount = 0;
  public orderByClause = null;
  public takeSpy = null;
  public skipSpy = null;
  private result: T;

  public constructor(result: T) {
    this.result = result;
  }

  public resetAllMocks() {
    this.andWhereCount = 0;
    this.orderByClause = null;
    this.takeSpy = null;
    this.skipSpy = null;
  }

  public select() {
    return this;
  }

  public addSelect() {
    return this;
  }

  public from(
    subqueryOrTable: string | ((subquery: FakeQueryBuilder<T>) => void),
  ) {
    if (subqueryOrTable instanceof Function) {
      subqueryOrTable(this);
    }
    return this;
  }

  public innerJoin() {
    return this;
  }

  public groupBy() {
    return this;
  }

  public andWhere() {
    this.andWhereCount++;
    return this;
  }

  public where() {
    return this;
  }

  public orderBy(clause: string) {
    this.orderByClause = clause;
    return this;
  }

  public addOrderBy() {
    return this;
  }

  public take(quantity: number) {
    this.takeSpy = quantity;
    return this;
  }

  public skip(quantity: number) {
    this.skipSpy = quantity;
    return this;
  }

  public leftJoin() {
    return this;
  }

  public getRawMany() {
    return [this.result];
  }

  public getRawOne() {
    return this.result;
  }
}
