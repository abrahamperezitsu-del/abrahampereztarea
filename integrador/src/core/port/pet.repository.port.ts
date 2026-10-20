export interface PetRepositoryPort {
  findAll(filters?: {
    species?: string;
    status?: PetStatus;
  }): Promise<Pet[]>;

  findById(id: string): Promise<Pet | null>;

  create(pet: Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pet>;

  update(id: string, updates: Partial<Pet>): Promise<Pet | null>;

  softDelete(id: string): Promise<boolean>;
}