export interface RepoWorker<T> {
  search(query: { key: string; value: unknown }): Promise<T[]>;
  create(payload: Partial<T>): Promise<T>;
}
