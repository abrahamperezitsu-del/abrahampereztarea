# Adapter - Capa de Adaptadores (HTTP y Persistencia)

## Descripción
Esta carpeta contiene las implementaciones concretas de los puertos definidos en la capa de dominio. Los adaptadores "adaptan" la lógica interna a tecnologías externas.

## Subdirectorios y propósito

### `adapter/Http/`
Contiene los adaptadores HTTP que exponen la API REST.

#### `pet.http.adapter.ts`
- Usa Express.js para definir endpoints: GET /pets, POST /pets, GET /pets/:id, etc.
- Valida entradas, maneja códigos de error (400, 404, 500)
- Convierte entre formato JSON de HTTP y entidades del dominio
- **Compatible con Dart**: la estructura de request/response JSON es deliberadamente plana y serializable

#### `owner.http.adapter.ts`
- Endpoints para gestión de dueños: GET /owners, POST /owners, etc.
- Valida que nombre y teléfono sean obligatorios

#### `clinicalHistory.http.adapter.ts`
- Endpoints parahistoria clínica: GET /clinical-histories, POST, GET por mascota
- Verifica que la mascota exista antes de crear historia

### `adapter/Persistence/`
Contiene los adaptadores de persistencia que hablan con la base de datos.

#### `pet.persistence.adapter.ts`
- Implementa `PetRepositoryPort` usando almacenamiento en memoria (simula SQLite)
- Métodos: findAll, findById, create, update, softDelete
- Los datos reseten al reiniciar (en producción conectarías con base de datos real)

#### `owner.persistence.adapter.ts`
- Implementa `OwnerRepositoryPort` usando mapa en memoria

#### `clinicalHistory.persistence.adapter.ts`
- Implementa `ClinicalHistoryRepositoryPort` con métodos `findAll`, `findAllByPetId`, `create`, `findById`

## Compatibilidad Dart
- Los adaptadores usan tipos y estructuras compatibles con la capa de dominio
- Los objetos JSON devueltos por los endpoints pueden mapearse directamente a clases de Dart
- Sin acoplamiento a bibliotecas específicas de Node.js en la capa de dominio