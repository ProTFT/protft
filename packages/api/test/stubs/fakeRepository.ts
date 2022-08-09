interface IndexedObject {
  id: number;
}

interface QueryOptions {
  where?: { [key: string]: string };
}

export class FakeRepository<T extends IndexedObject> {
  constructor(private entries: T[]) {}

  find(queryOptions: QueryOptions): T[] {
    if (!queryOptions?.where) {
      return this.entries;
    }
    const { where } = queryOptions;
    return Object.keys(where).reduce(
      (acc, curr) => acc.filter((entry) => entry[curr] === where[curr]),
      this.entries,
    );
  }

  count(queryOptions: QueryOptions): number {
    return this.find(queryOptions).length;
  }

  findOne(id: number): T | undefined {
    return this.entries.find((entry) => entry.id === id);
  }

  save(payload: T) {
    this.entries.push(payload);
  }
}
