import {PetStatus} from '../interfaces/pet';

export const MapStatus: LabelMap[] = [
  {
    label: 'Available',
    value: PetStatus.AVAILABLE,
  },
  {
    label: 'Pending',
    value: PetStatus.PENDING,
  },
  {
    label: 'Sold',
    value: PetStatus.SOLD,
  },
];

export type LabelMap = { label: string; value: string };
