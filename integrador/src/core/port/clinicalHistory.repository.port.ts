export interface ClinicalHistoryRepositoryPort {
  findAll(): Promise<ClinicalHistory[]>;

  findAllByPetId(petId: string): Promise<ClinicalHistory[]>;

  create(history: Omit<ClinicalHistory, 'id' | 'createdAt'>): Promise<ClinicalHistory>;

  findById(id: string): Promise<ClinicalHistory | null>;
}