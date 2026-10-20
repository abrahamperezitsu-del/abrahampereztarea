import { Owner } from '../core/pet.entity';
import { OwnerRepositoryPort } from '../core/port/owner.repository.port';

// Almacenamiento en memoria (simula base de datos)
const ownersStorage: Map<string, Owner> = new Map();
let nextOwnerId = 1;

export class OwnerSqliteAdapter implements OwnerRepositoryPort {
  async findAll(): Promise<Owner[]> {
    return Array.from(ownersStorage.values());
  }

  async findById(id: string): Promise<Owner | null> {
    return ownersStorage.get(id) || null;
  }

  async findByPhone(phone: string): Promise<Owner | null> {
    return Array.from(ownersStorage.values()).find(
      (owner) => owner.phone === phone
    ) || null;
  }

  async create(owner: Omit<Owner, 'id'>): Promise<Owner> {
    const id = `owner-${nextOwnerId++}`;
    const newOwner: Owner = {
      ...owner,
      id,
    };
    ownersStorage.set(id, newOwner);
    return newOwner;
  }

  async update(id: string, updates: Partial<Owner>): Promise<Owner | null> {
    const existing = ownersStorage.get(id);
    if (!existing) return null;

    const updated: Owner = { ...existing, ...updates };
    ownersStorage.set(id, updated);
    return updated;
  }
}