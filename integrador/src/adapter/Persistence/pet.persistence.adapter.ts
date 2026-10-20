import { Pet, PetStatus } from '../core/pet.entity';
import { PetRepositoryPort } from '../core/port/pet.repository.port';
import { Owner } from '../core/pet.entity';
import { OwnerRepositoryPort } from '../core/port/owner.repository.port';
import { ClinicalHistory } from '../core/pet.entity';
import { ClinicalHistoryRepositoryPort } from '../core/port/clinicalHistory.repository.port';

// Almacenamiento en memoria (simula base de datos)
// Se reinicia al reiniciar la aplicación - en producción se conectaría a una BD real
const petsStorage: Map<string, Pet> = new Map();
const ownersStorage: Map<string, Owner> = new Map();
const clinicalHistoriesStorage: Map<string, ClinicalHistory> = new Map();
let nextPetId = 1;
let nextOwnerId = 1;
let nextHistoryId = 1;

export class PetSqliteAdapter implements PetRepositoryPort {
  async findAll(filters?: {
    species?: string;
    status?: PetStatus;
  }): Promise<Pet[]> {
    let results = Array.from(petsStorage.values());

    if (filters?.species) {
      results = results.filter((pet) => pet.species === filters.species);
    }
    if (filters?.status) {
      results = results.filter((pet) => pet.status === filters.status);
    }

    return results;
  }

  async findById(id: string): Promise<Pet | null> {
    return petsStorage.get(id) || null;
  }

  async create(pet: Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pet> {
    const id = crypto.randomUUID();
    const now = new Date();
    const newPet: Pet = {
      ...pet,
      id,
      createdAt: now,
      updatedAt: now,
    };
    petsStorage.set(id, newPet);
    return newPet;
  }

  async update(id: string, updates: Partial<Pet>): Promise<Pet | null> {
    const existing = petsStorage.get(id);
    if (!existing) return null;

    const updated: Pet = { ...existing, ...updates, updatedAt: new Date() };
    petsStorage.set(id, updated);
    return updated;
  }

  async softDelete(id: string): Promise<boolean> {
    const existing = petsStorage.get(id);
    if (!existing) return false;
    existing.status = 'inactive';
    petsStorage.set(id, existing);
    return true;
  }
}

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

export class ClinicalHistorySqliteAdapter implements ClinicalHistoryRepositoryPort {
  async findAllByPetId(petId: string): Promise<ClinicalHistory[]> {
    return Array.from(clinicalHistoriesStorage.values()).filter(
      (h) => h.petId === petId
    );
  }

  async create(history: Omit<ClinicalHistory, 'id' | 'createdAt'>): Promise<ClinicalHistory> {
    const id = crypto.randomUUID();
    const now = new Date();
    const newHistory: ClinicalHistory = {
      ...history,
      id,
      createdAt: now,
    };
    clinicalHistoriesStorage.set(id, newHistory);
    return newHistory;
  }

  async findById(id: string): Promise<ClinicalHistory | null> {
    return clinicalHistoriesStorage.get(id) || null;
  }
}