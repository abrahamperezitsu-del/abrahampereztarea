# Core Layer

## Descripción
Esta carpeta contiene la capa de dominio y los puertos (interfaces) que definen los contratos de la aplicación. Es el corazón de la arquitectura hexagonal y contiene la lógica de negocio pura, independiente de cualquier framework o tecnología de persistencia.

## Contenido

### Entidades (`*.entity.ts`)
- **Pet**: Interfaz que representa una mascota con sus propiedades (id, nombre, especie, raza, etc.)
- **Owner**: Interfaz que representa un dueño de mascota
- **PetStatus**: Tipo enumerado para el estado de la mascota (active, inactive, deceased)
- **ClinicalHistory**: Interfaz para el historial clínico de visitas veterinarias

### Puertos (`port/*.port.ts`)
- **PetRepositoryPort**: Interfaz que define las operaciones de repositorio para mascotas
  - `findAll(filters)`: Listar mascotas con filtros opcionales (especie, estado)
  - `findById(id)`: Obtener mascota por ID
  - `create(pet)`: Crear nueva mascota
  - `update(id, updates)`: Actualizar mascota existente
  - `softDelete(id)`: Eliminación lógica de mascota
- **OwnerRepositoryPort**: Interfaz para operaciones de dueños
- **ClinicalHistoryRepositoryPort**: Interfaz para historial clínico

## Propósito y Diseño

### Arquitectura Hexagonal (Ports & Adapters)
- La capa **Core** define los puertos (interfaces) que deben cumplir los adaptadores
- No tiene dependencias externas a frameworks (Express, bases de datos, etc.)
- Esto permite cambiar la implementación de la base de datos o el framework HTTP sin afectar la lógica de dominio

### Compatibilidad con Dart
- Las interfaces y tipos de TypeScript pueden traducirse directamente a clases de Dart
- Las entidades son objetos planos JSON-serializables que funcionan con `fromJson`/`toJson` en Dart
- Los puertos se pueden implementar en Dart usando clases abstractas o interfaces
- La separación capa/dominio capas facilita la creación de la misma arquitectura en Flutter/Dart

### Modificabilidad
- Para agregar nueva funcionalidad: crear nuevas entidades o extender los puertos existentes
- Para cambiar lógica de negocio: modificar las entidades o agregar casos de uso en esta capa
- Para cambiar tecnología de persistencia: implementar nuevos adaptadores que cumplan los mismos puertos

### Estructura Relacionada
- `src/adapter/Persistence/`: Implementaciones concretas del repositorio (SQLite en memoria)
- `src/adapter/Http/`: Controladores que consumen los puertos para exponer endpoints HTTP