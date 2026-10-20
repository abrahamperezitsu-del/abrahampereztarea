# Core - Capa de Dominio y Puertos

## Descripción
Esta carpeta contiene la lógica de negocio pura y las entidades del dominio, independientemente de cualquier framework o tecnología externa. Es el corazón de la arquitectura hexagonal.

## Archivos y propósito

### `pet.entity.ts`
- Define las interfaces principales: `Pet`, `Owner`, `PetStatus`, `ClinicalHistory`
- Todas las tipos son serializables a JSON y independientes de cualquier BD o API
- Diseñados para mapear fácilmente a clases de Dart para compatibilidad multiplataforma

### `port/pet.repository.port.ts`
- Define el contrato (interfaz) para el repositorio de mascotas
- Métodos: `findAll`, `findById`, `create`, `update`, `softDelete`
- La capa de adaptadores implementará esta interfaz; la capa de dominio no sabe de bases de datos ni HTTP

### `port/owner.repository.port.ts`
- Contrato para operaciones de dueños
- Métodos: `findAll`, `findById`, `findByPhone`, `create`, `update`

### `port/clinicalHistory.repository.port.ts`
- Contrato para historial clínico
- Métodos: `findAll`, `findAllByPetId`, `create`, `findById`

## Arquitectura hexagonal
- El núcleo no tiene importaciones de express, sqlite ni ningún otro framework externo
- Esto permite traducir fácilmente el código a Dart manteniendo la misma estructura de puertos y casos de uso