import { Router, Request, Response } from 'express';
import { PetRepositoryPort } from '../core/port/pet.repository.port';
import { Pet, PetStatus } from '../core/pet.entity';
import { OwnerRepositoryPort } from '../core/port/owner.repository.port';
import { ClinicalHistoryRepositoryPort } from '../core/port/clinicalHistory.repository.port';

export class PetHttpAdapter {
  private router: Router;
  private petRepository: PetRepositoryPort;
  private ownerRepository: OwnerRepositoryPort;
  private clinicalHistoryRepository: ClinicalHistoryRepositoryPort;

  constructor(
    petRepository: PetRepositoryPort,
    ownerRepository: OwnerRepositoryPort,
    clinicalHistoryRepository: ClinicalHistoryRepositoryPort
  ) {
    this.router = Router();
    this.petRepository = petRepository;
    this.ownerRepository = ownerRepository;
    this.clinicalHistoryRepository = clinicalHistoryRepository;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // GET /pets - Listar todas las mascotas con filtros opcionales
    this.router.get('/', this.listPets);

    // GET /pets/:id - Obtener mascota por ID
    this.router.get('/:id', this.getPetById);

    // POST /pets - Crear nueva mascota
    this.router.post('/', this.createPet);

    // PATCH /pets/:id - Actualizar mascota
    this.router.patch('/:id', this.updatePet);

    // DELETE /pets/:id - Eliminar lógica (soft delete)
    this.router.delete('/:id', this.softDeletePet);

    // GET /pets/owner/:ownerId - Listar mascotas por dueño
    this.router.get('/owner/:ownerId', this.listPetsByOwner);

    // GET /pets/species/:species - Listar mascotas por especie
    this.router.get('/species/:species', this.listPetsBySpecies);

    // GET /pets/status/:status - Listar mascotas por estado
    this.router.get('/status/:status', this.listPetsByStatus);

    // POST /owners - Crear dueño
    this.router.post('/owners', this.createOwner);

    // POST /pets/:petId/clinical-history - Agregar historia clínica
    this.router.post('/:petId/clinical-history', this.addClinicalHistory);

    // GET /pets/:petId/clinical-history - Listar historia clínica
    this.router.get('/:petId/clinical-history', this.listClinicalHistory);
  }

  private listPets = async (req: Request, res: Response): Promise<void> => {
    try {
      const { species, status } = req.query;
      const filters = {
        species: species as string | undefined,
        status: status as PetStatus | undefined,
      };
      const pets = await this.petRepository.findAll(filters);
      res.status(200).json(pets);
    } catch (error) {
      console.error('Error listing pets:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private getPetById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const pet = await this.petRepository.findById(id);
      if (!pet) {
        return res.status(404).json({ error: 'Mascota no encontrada' });
      }
      res.status(200).json(pet);
    } catch (error) {
      console.error('Error getting pet by ID:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private createPet = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        name,
        species,
        breed,
        age,
        weight,
        color,
        ownerName,
        ownerPhone,
      } = req.body;

      if (!name || !species) {
        return res.status(400).json({ error: 'Nombre y especie son requeridos' });
      }

      const pet: Pet = {
        id: crypto.randomUUID(),
        name,
        species,
        breed,
        age,
        weight,
        color,
        ownerName,
        ownerPhone,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdPet = await this.petRepository.create(pet);
      res.status(201).json(createdPet);
    } catch (error) {
      console.error('Error creating pet:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private updatePet = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedPet = await this.petRepository.update(id, updates);
      if (!updatedPet) {
        return res.status(404).json({ error: 'Mascota no encontrada' });
      }

      res.status(200).json(updatedPet);
    } catch (error) {
      console.error('Error updating pet:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private softDeletePet = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await this.petRepository.softDelete(id);
      if (!result) {
        return res.status(404).json({ error: 'Mascota no encontrada' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error soft deleting pet:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private listPetsByOwner = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ownerId } = req.params;
      const pets = await this.petRepository.findAll();
      const ownerPets = pets.filter((pet) => pet.ownerName === ownerId);
      res.status(200).json(ownerPets);
    } catch (error) {
      console.error('Error listing pets by owner:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private listPetsBySpecies = async (req: Request, res: Response): Promise<void> => {
    try {
      const { species } = req.params;
      const pets = await this.petRepository.findAll();
      const speciesPets = pets.filter((pet) => pet.species === species);
      res.status(200).json(speciesPets);
    } catch (error) {
      console.error('Error listing pets by species:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private listPetsByStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.params;
      const pets = await this.petRepository.findAll();
      const statusPets = pets.filter((pet) => pet.status === status);
      res.status(200).json(statusPets);
    } catch (error) {
      console.error('Error listing pets by status:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private createOwner = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, phone, address } = req.body;

      if (!name || !phone) {
        return res.status(400).json({ error: 'Nombre y teléfono son requeridos' });
      }

      const owner: Owner = {
        id: crypto.randomUUID(),
        name,
        phone,
        address,
        pets: [],
      };

      const createdOwner = await this.ownerRepository.create(owner);
      res.status(201).json(createdOwner);
    } catch (error) {
      console.error('Error creating owner:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private addClinicalHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { petId } = req.params;
      const { reason, diagnosis, treatment, weight, temperature } = req.body;

      if (!reason) {
        return res.status(400).json({ error: 'Motivo de la visita es requerido' });
      }

      // Verify pet exists
      const pet = await this.petRepository.findById(petId);
      if (!pet) {
        return res.status(404).json({ error: 'Mascota no encontrada' });
      }

      const history: ClinicalHistory = {
        id: crypto.randomUUID(),
        petId,
        visitDate: new Date(),
        reason,
        diagnosis,
        treatment,
        weight,
        temperature,
        createdAt: new Date(),
      };

      const createdHistory = await this.clinicalHistoryRepository.create(history);
      res.status(201).json(createdHistory);
    } catch (error) {
      console.error('Error adding clinical history:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private listClinicalHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { petId } = req.params;
      const histories = await this.clinicalHistoryRepository.findAllByPetId(petId);
      res.status(200).json(histories);
    } catch (error) {
      console.error('Error listing clinical history:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  getRouter(): Router {
    return this.router;
  }
}