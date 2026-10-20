# Adapter Layer

## Descripción
Esta carpeta contiene los adaptadores que convierten las llamadas externas (HTTP, base de datos) en llamadas al núcleo de la aplicación. Los adaptadores implementan los puertos definidos en la capa `core/` y son la capa de "delgadez" que sabe cómo interactuar con tecnologías específicas.

## Contenido

### Adaptadores HTTP (`Http/*.adapter.ts`)
- **PetHttpAdapter**: Expone endpoints REST para operaciones de mascotas
  - `GET /pets` - Listar mascotas con filtros opcionales
  - `GET /pets/:id` - Obtener mascota por ID
  - `POST /pets` - Crear nueva mascota
  - `PATCH /pets/:id` - Actualizar mascota
  - `DELETE /pets/:id` - Soft delete de mascota
  - `GET /pets/owner/:ownerId` - Listar mascotas por dueño
  - `GET /pets/species/:species` - Listar mascotas por especie
  - `GET /pets/status/:status` - Listar mascotas por estado
  - `POST /owners` - Crear dueño
  - `POST /pets/:petId/clinical-history` - Agregar historia clínica
  - `GET /pets/:petId/clinical-history` - Listar historia clínica

- **OwnerHttpAdapter**: Expone endpoints para operaciones de dueños
  - `GET /owners` - Listar dueños
  - `GET /owners/:id` - Obtener dueño por ID
  - `POST /owners` - Crear dueño
  - `PATCH /owners/:id` - Actualizar dueño
  - `GET /owners/:ownerId/pets` - Listar mascotas por dueño

- **ClinicalHistoryHttpAdapter**: Expone endpoints para historial clínico
  - `GET /clinical-histories` - Listar todas las historias
  - `GET /clinical-histories/:id` - Obtener historia por ID
  - `POST /clinical-histories` - Crear nueva historia clínica
  - `GET /clinical-histories/by-pet/:petId` - Listar historia por mascota
  - `PATCH /clinical-histories/:id` - Actualizar historia clínica

### Adaptadores de Persistencia (`Persistence/*.adapter.ts`)
- **PetSqliteAdapter**: Implementa `PetRepositoryPort` usando almacenamiento en memoria (simula SQLite)
- **OwnerSqliteAdapter**: Implementa `OwnerRepositoryPort` usando almacenamiento en memoria
- **ClinicalHistorySqliteAdapter**: Implementa `ClinicalHistoryRepositoryPort` usando almacenamiento en memoria

## Propósito y Diseño

### Arquitectura Hexagonal
- Los adaptadores **implementan** los puertos de la capa core
- Cada adaptador sabe cómo mapear entre el mundo externo y el núcleo
- Si cambiamos de SQLite a PostgreSQL, solo reescribimos los adaptadores de persistencia, no la lógica de negocio

### Compatibilidad con Dart
- Los adaptadores HTTP pueden traducirse a controladores de servidor de Dart (shelf, http_server, o frameworks como Aqueduct/Shelf)
- Los adaptadores de persistencia pueden traducirse a código de Dart que use `sqflite`, `drift`, o APIs de servicio web
- Las firmas de los métodos en los adaptadores coinciden con los puertos, facilitando la traducción
- Todo el flujo de datos usa objetos JSON/plain objects compatibles con `fromJson`/ `copyWith` en Dart

### Modificabilidad
- Para agregar nuevo endpoint HTTP: crear nuevo método en el adaptador HTTP correspondiente, agregar ruta en `app.ts`
- Para cambiar proveedor de base de datos: implementar nueva clase de adaptador que cumpla el mismo puerto, actualizar el `app.ts` para usar la nueva instancia
- Para agregar nuevo dominio: agregar nueva entidad en core, nuevo puerto, y nuevos adaptadores

### Dependencias
- Depende de: `core/` (puertos y entidades)
- Es usado por: `src/app.ts` (punto de entrada)