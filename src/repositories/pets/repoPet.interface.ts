export interface RepoPet<T> {
  query(): Promise<T[]>;
  find(id: string): Promise<T>;
  findOwner(owner: string): Promise<T[]>;
  create(payload: Partial<T>): Promise<T>;
  update(payload: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}
