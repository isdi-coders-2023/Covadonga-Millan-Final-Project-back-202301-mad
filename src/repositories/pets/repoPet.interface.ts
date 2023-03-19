export interface RepoPet<T> {
  query(): Promise<T[]>;
  queryId(id: string): Promise<T>;
  search(query: { [key: string]: unknown }): Promise<T[]>;
  create(payload: Partial<T>): Promise<T>;
  update(payload: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
