# Integrador - Backend Hexagonal para Aplicación Veterinaria

## Visión General
Estructura backend implementada con arquitectura hexagonal (Ports & Adapters), diseñada para ser:
- **Modificable**: Fácil cambiar implementaciones sin afectar la lógica de negocio
- **Portable**: Arquitectura compatible con Dart para aplicación móvil (Flutter)
- **Escalable**: Listo para recibir lógica de negocio cuando se defina el flujo completo

## Estructura de Carpetas

### `src/core/` - Capa de Dominio
- Entidades del dominio: `Pet`, `Owner`, `ClinicalHistory`
- Puertos (interfaces) que definen contratos: `PetRepositoryPort`, `OwnerRepositoryPort`, `ClinicalHistoryRepositoryPort`
- Lógica de negocio pura, sin dependencias externas
- **Objetivo**: Contiene la esencia de la veterinaria - mascotas, dueños, historiales clínicos

### `src/adapter/` - Capa de Adaptadores
#### `Http/` - Adaptadores HTTP (Express.js)
- `pet.http.adapter.ts`: Endpoints `/pets`, `/pets/:id`, `/owners`, `/clinical-histories`
- `owner.http.adapter.ts`: Endpoints para gestión de dueños
- `clinicalHistory.http.adapter.ts`: Endpoints para historial clínico
- **Propósito**: Recibir peticiones HTTP, validar, llamar a los puertos del núcleo
- **Compatibilidad Dart**: Estructuras JSON planas y serializables

#### `Persistence/` - Adaptadores de Datos
- `pet.persistence.adapter.ts`: Implementa `PetRepositoryPort` con almacenamiento en memoria
- `owner.persistence.adapter.ts`: Implementa `OwnerRepositoryPort`
- `clinicalHistory.persistence.adapter.ts`: Implementa `ClinicalHistoryRepositoryPort`
- **Propósito**: Convertir llamadas del núcleo a operaciones de almacenamiento
- **Nota**: Usa Mapas en memoria; en producción se conectaría con PostgreSQL, MongoDB, etc.

### `src/port/` - Interfaces de Contrato
- Define los puertos que conectan el núcleo con los adaptadores
- Mismo patrón se replicaría en Dart para portabilidad

### `docs/` - Documentación
- `01-core.md`: Documentación de la capa de dominio
- `02-adapter.md`: Documentación de adaptadores HTTP y persistencia
- `03-port.md`: Documentación de interfaces y contratos
- `core.md`: Visión general de la capa de dominio
- `adapter.md`: Visión general de los adaptadores
- `port.md`: Visión general de los puertos

## Compatibilidad con Dart / Flutter

### Mapeo a Dart
Esta arquitectura ha sido diseñada pensando en la portabilidad a Dart:

1. **Entidades → Clases de Dart**
   - `Pet`, `Owner`, `ClinicalHistory` son tipos puros
   - Pueden convertirse directamente a clases de Dart con `fromJson`/`toJson`
   - Sin uso de decoradores o características específicas de Node.js

2. **Puertos → Interfaces de Dart**
   - `PetRepositoryPort`, etc. se traducen a interfaces de Dart o clases abstractas
   - Mismo nombre de métodos, firmas compatibles

3. **Adaptadores HTTP → Controladores Dart**
   - `PetHttpAdapter` → Controlador usando `shelf`, `http_server`, o framework como `Aqueduct`
   - Rutas Express (`app.use('/pets', ...)`) → Rutas de Dart equivalente

4. **Adaptadores Persistencia → Servicios DB Dart**
   - `PetSqliteAdapter` → Usar `sqflite`, `drift`, o APIs remotas
   - Mismos métodos: `findAll`, `findById`, `create`, `update`

### Beneficios de este enfoque
- **Código compartido**: Lógica de dominio y puertos pueden compartirse entre backend Node.js y app Flutter
- **Consistencia**: Mismo modelo de datos en todas las plataformas
- **Fácil testing**: Los puertos permiten mocking independientemente de la plataforma
- **Futuro-proof**: Cuando se defina la lógica de negocio, solo se implementan los casos de uso sin reescribir la estructura

## Estado Actual
- ✅ Arquitectura hexagonal implementada
- ✅ Entidades y puertos definidos
- ✅ Adaptadores HTTP con Express.js
- ✅ Adaptadores de persistencia en memoria
- ✅ Documentación por carpeta
- ⏳ Listo para recibir lógica de negocio cuando se defina el flujo completo
- ⏳ Preparado para traducción a Dart para aplicación móvil

## Próximos pasos cuando se defina la lógica
1. Agregar casos de uso en la capa core (use cases)
2. Implementar validaciones de negocio específicas
3. Conectar con base de datos real (PostgreSQL/MySQL)
4. Agregar autenticación y autorización
5. Traducir a Dart para aplicación Flutter