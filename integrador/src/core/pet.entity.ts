export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age?: number;
  weight?: number;
  color?: string;
  ownerName?: string;
  ownerPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
  address?: string;
  pets?: Pet[];
}

export type PetStatus = 'active' | 'inactive' | 'deceased';

export interface ClinicalHistory {
  id: string;
  petId: string;
  visitDate: Date;
  reason: string;
  diagnosis?: string;
  treatment?: string;
  weight?: number;
  temperature?: number;
  createdAt: Date;
}