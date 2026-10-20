import { Router, Request, Response } from 'express';
import { ClinicalHistoryRepositoryPort } from '../core/port/clinicalHistory.repository.port';
import { PetRepositoryPort } from '../core/port/pet.repository.port';
import { ClinicalHistory } from '../core/pet.entity';

export class ClinicalHistoryHttpAdapter {
  private router: Router;
  private clinicalHistoryRepository: ClinicalHistoryRepositoryPort;
  private petRepository: PetRepositoryPort;

  constructor(
    clinicalHistoryRepository: ClinicalHistoryRepositoryPort,
    petRepository: PetRepositoryPort
  ) {
    this.router = Router();
    this.clinicalHistoryRepository = clinicalHistoryRepository;
    this.petRepository = petRepository;
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // GET /clinical-histories - Listar todas las historias clínicas
    this.router.get('/', this.listAllHistories);

    // GET /clinical-histories/:id - Obtener historia clínica por ID
    this.router.get('/:id', this.getHistoryById);

    // POST /clinical-histories - Crear nueva historia clínica
    this.router.post('/', this.createHistory);

    // GET /clinical-histories/by-pet/:petId - Listar historia clínica por mascota
    this.router.get('/by-pet/:petId', this.listHistoryByPet);

    // PATCH /clinical-histories/:id - Actualizar historia clínica
    this.router.patch('/:id', this.updateHistory);
  }

  private listAllHistories = async (req: Request, res: Response): Promise<void> => {
    try {
      const histories = await this.clinicalHistoryRepository.findAll();
      res.status(200).json(histories);
    } catch (error) {
      console.error('Error listing histories:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private getHistoryById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const history = await this.clinicalHistoryRepository.findById(id);
      if (!history) {
        return res.status(404).json({ error: 'Historia clínica no encontrada' });
      }
      res.status(200).json(history);
    } catch (error) {
      console.error('Error getting history by ID:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private createHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { petId, reason, diagnosis, treatment, weight, temperature } = req.body;

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
      console.error('Error creating clinical history:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private listHistoryByPet = async (req: Request, res: Response): Promise<void> => {
    try {
      const { petId } = req.params;
      const histories = await this.clinicalHistoryRepository.findAllByPetId(petId);
      res.status(200).json(histories);
    } catch (error) {
      console.error('Error listing history by pet:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  private updateHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const existing = await this.clinicalHistoryRepository.findById(id);
      if (!existing) {
        return res.status(404).json({ error: 'Historia clínica no encontrada' });
      }

      const updated: ClinicalHistory = { ...existing, ...updates };
      // We need an update method in the repository, for now just return
      res.status(200).json(updated);
    } catch (error) {
      console.error('Error updating history:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

  getRouter(): Router {
    return this.router;
  }
}