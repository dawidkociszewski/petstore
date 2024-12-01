import {AbstractControl, FormGroup} from '@angular/forms';
import {ICategory, IPet, ITag} from './pet';

export type PetFormControls = {
  [key in keyof IPet]: AbstractControl;
};
export type PetFormGroup = FormGroup & {
  value: IPet;
  controls: PetFormControls;
};

export type CategoryFormControls = {
  [key in keyof ICategory]: AbstractControl;
};
export type CategoryFormGroup = FormGroup & {
  value: ICategory;
  controls: CategoryFormControls;
};

export type TagFormControls = {
  [key in keyof ITag]: AbstractControl;
};
export type TagFormGroup = FormGroup & {
  value: ITag;
  controls: TagFormControls;
};
