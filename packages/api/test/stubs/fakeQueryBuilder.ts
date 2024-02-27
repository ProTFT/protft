export class FakeQueryBuilder<T> {
  public andWhereCount = 0;
  public orderByClause = null;
  public takeSpy = null;
  public skipSpy = null;
  public wasCalled = false;
  private result: T;

  public constructor(result: T) {
    this.result = result;
  }

  public resetAllMocks() {
    this.andWhereCount = 0;
    this.orderByClause = null;
    this.takeSpy = null;
    this.skipSpy = null;
    this.wasCalled = false;
  }

  public select() {
    return this;
  }

  public addSelect() {
    return this;
  }

  public distinct() {
    return this;
  }

  public getMany() {
    this.wasCalled = true;
    return this.result;
  }

  public getOne() {
    this.wasCalled = true;
    return this.result;
  }

  public execute() {
    this.wasCalled = true;
    return this.result;
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
    this.wasCalled = true;
    return [this.result];
  }

  public getRawOne() {
    this.wasCalled = true;
    return this.result;
  }
}
