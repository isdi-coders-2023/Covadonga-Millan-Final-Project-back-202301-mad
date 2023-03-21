export interface RepoPet<T> {
  queryPets(): Promise<T[]>;
  findPet(id: string): Promise<T>;
  findOwner(owner: string): Promise<T[]>;
  createPet(payload: Partial<T>): Promise<T>;
  updatePet(payload: Partial<T>): Promise<T>;
  deletePet(id: string): Promise<void>;
}
