import { ClinicalHistory } from '../core/pet.entity';
import { ClinicalHistoryRepositoryPort } from '../core/port/clinicalHistory.repository.port';

// Almacenamiento en memoria (simula base de datos)
const clinicalHistoriesStorage: Map<string, ClinicalHistory> = new Map();

export class ClinicalHistorySqliteAdapter implements ClinicalHistoryRepositoryPort {
  async findAll(): Promise<ClinicalHistory[]> {
    return Array.from(clinicalHistoriesStorage.values());
  }

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