import 'reflect-metadata';
import express from 'express';
import { PetSqliteAdapter } from './adapter/Persistence/pet.persistence.adapter';
import { OwnerSqliteAdapter } from './adapter/Persistence/owner.persistence.adapter';
import { ClinicalHistorySqliteAdapter } from './adapter/Persistence/clinicalHistory.persistence.adapter';
import { PetHttpAdapter } from './adapter/Http/pet.http.adapter';
import { OwnerHttpAdapter } from './adapter/Http/owner.http.adapter';
import { ClinicalHistoryHttpAdapter } from './adapter/Http/clinicalHistory.http.adapter';

// Repositorios (implementaciones)
const petRepository = new PetSqliteAdapter();
const ownerRepository = new OwnerSqliteAdapter();
const clinicalHistoryRepository = new ClinicalHistorySqliteAdapter();

// Adaptadores HTTP
const petHttpAdapter = new PetHttpAdapter(
  petRepository,
  ownerRepository,
  clinicalHistoryRepository
);

const ownerHttpAdapter = new OwnerHttpAdapter(
  ownerRepository,
  petRepository
);

const clinicalHistoryHttpAdapter = new ClinicalHistoryHttpAdapter(
  clinicalHistoryRepository,
  petRepository
);

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de mascotas
app.use('/pets', petHttpAdapter.getRouter());

// Rutas de dueños
app.use('/owners', ownerHttpAdapter.getRouter());

// Rutas de historia clínica
app.use('/clinical-histories', clinicalHistoryHttpAdapter.getRouter());

// Ruta de salud
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Manejador de rutas para endpoints no encontrados
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Exportar app para testing
export default app;