export interface RepoPet<T> {
  search(query: { [key: string]: unknown }): Promise<T[]>;
  find(id: string): Promise<T>;
  create(payload: Partial<T>): Promise<T>;
  update(payload: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
