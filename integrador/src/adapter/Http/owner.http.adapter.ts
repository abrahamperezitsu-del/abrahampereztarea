import { Router, Request, Response } from 'express';
import { OwnerRepositoryPort } from '../core/port/owner.repository.port';
import { PetRepositoryPort } from '../core/port/pet.repository.port';
import { Owner, Pet } from '../core/pet.entity';

export class OwnerHttpAdapter {
  private router: Router;
  private ownerRepository: OwnerRepositoryPort;
  private petRepository: PetRepositoryPort;

  constructor(
    ownerRepository: OwnerRepositoryPort,
    petRepository: PetRepositoryPort
  ) {
    this.router = Router();
    this.ownerRepository = ownerRepository;
    this.petRepository = petRepository;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // GET /owners - Listar todos los dueños
    this.router.get('/', this.listOwners);

    // GET /owners/:id - Obtener dueño por ID
    this.router.get('/:id', this.getOwnerById);

    // POST /owners - Crear nuevo dueño
    this.router.post('/', this.createOwner);

    // PATCH /owners/:id - Actualizar dueño
    this.router.patch('/:id', this.updateOwner);

    // GET /owners/:ownerId/pets - Listar mascotas por dueño
    this.router.get('/:ownerId/pets', this.listPetsByOwner);
  }

  private listOwners = async (req: Request, res: Response): Promise<void> => {
    try {
      const owners = await this.ownerRepository.findAll();
      res.status(200).json(owners);
    } catch (error) {
      console.error('Error listing owners:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private getOwnerById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const owner = await this.ownerRepository.findById(id);
      if (!owner) {
        return res.status(404).json({ error: 'Dueño no encontrado' });
      }
      res.status(200).json(owner);
    } catch (error) {
      console.error('Error getting owner by ID:', error);
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

  private updateOwner = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedOwner = await this.ownerRepository.update(id, updates);
      if (!updatedOwner) {
        return res.status(404).json({ error: 'Dueño no encontrado' });
      }

      res.status(200).json(updatedOwner);
    } catch (error) {
      console.error('Error updating owner:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private listPetsByOwner = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ownerId } = req.params;
      const allPets = await this.petRepository.findAll();
      const ownerPets = allPets.filter((pet) => pet.ownerName === ownerId);
      res.status(200).json(ownerPets);
    } catch (error) {
      console.error('Error listing pets by owner:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  getRouter(): Router {
    return this.router;
  }
}