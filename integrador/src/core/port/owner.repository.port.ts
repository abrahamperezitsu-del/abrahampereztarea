export interface OwnerRepositoryPort {
  findAll(): Promise<Owner[]>;

  findById(id: string): Promise<Owner | null>;

  findByPhone(phone: string): Promise<Owner | null>;

  create(owner: Omit<Owner, 'id'>): Promise<Owner>;

  update(id: string, updates: Partial<Owner>): Promise<Owner | null>;
}