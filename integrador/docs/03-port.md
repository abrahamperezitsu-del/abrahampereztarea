# Port - Interfaces y Contratos

## Descripción
Esta carpeta contiene las interfaces (puertos) que definen los contratos entre las diferentes capas. En la arquitectura hexagonal, los puertos son las puertas de entrada y salida.

## Archivos

### `core/port/pet.repository.port.ts`
```typescript
export interface PetRepositoryPort {
  findAll(filters?: { species?: string; status?: PetStatus }): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
  create(pet: Omit<Pet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Pet>;
  update(id: string, updates: Partial<Pet>): Promise<Pet | null>;
  softDelete(id: string): Promise<boolean>;
}
```
- Define qué operaciones pueden realizarse con las mascotas
- La implementación (adapter) decide cómo cumplir este contrato

### `core/port/owner.repository.port.ts`
```typescript
export interface OwnerRepositoryPort {
  findAll(): Promise<Owner[]>;
  findById(id: string): Promise<Owner | null>;
  findByPhone(phone: string): Promise<Owner | null>;
  create(owner: Omit<Owner, 'id'>): Promise<Owner>;
  update(id: string, updates: Partial<Owner>): Promise<Owner | null>;
}
```

### `core/port/clinicalHistory.repository.port.ts`
```typescript
export interface ClinicalHistoryRepositoryPort {
  findAll(): Promise<ClinicalHistory[]>;
  findAllByPetId(petId: string): Promise<ClinicalHistory[]>;
  create(history: Omit<ClinicalHistory, 'id' | 'createdAt'>): Promise<ClinicalHistory>;
  findById(id: string): Promise<ClinicalHistory | null>;
```

## Propósito
- **Inversión de dependencias**: La capa de dominio depende de estas interfaces, no de implementaciones concretas
- **Facilidad para cambiar**: Se puede cambiar de SQLite a PostgreSQL, o de Node.js a Dart, solo implementando nuevamente estos portos
- **Testing**: Los casos de uso pueden inyectar mocks de estos portos sin necesidad de bases de datos reales
- **Portabilidad**: Las mismas interfaces se pueden implementar en Dart para móvil manteniendo la lógica de negocio intacta