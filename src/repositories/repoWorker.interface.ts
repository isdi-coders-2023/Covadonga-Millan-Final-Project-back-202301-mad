export interface RepoWorker<T> {
  create(payload: Partial<T>): Promise<T>;
}
