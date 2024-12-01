export interface IPet {
  id?: number;
  category?: ICategory;
  name: string;
  photoUrls: string[];
  tags?: ITag[];
  status?: status;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  name: string;
}

export enum PetStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  SOLD = 'sold',
}

type status = 'available' | 'pending' | 'sold';
