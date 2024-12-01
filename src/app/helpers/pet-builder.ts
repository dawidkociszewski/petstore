import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {PetStatus} from '../interfaces/pet';
import {CategoryFormControls, CategoryFormGroup, PetFormControls, PetFormGroup, TagFormGroup} from '../interfaces/form';
import {generateId} from './generate-id';

export class PetBuilder {
  static generateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl<number>(null),
      category: new FormGroup({
        id: new FormControl<number>(generateId()),
        name: new FormControl<string>(null),
      } as CategoryFormControls) as CategoryFormGroup,
      name: new FormControl<string>(null, [Validators.required]),
      photoUrls: new FormArray<FormControl<string>>([new FormControl<string>(null, [Validators.required])], [Validators.required, Validators.minLength(1)]),
      tags: new FormArray<TagFormGroup>([]),
      status: new FormControl<PetStatus>(null),
    } as PetFormControls) as PetFormGroup
  };
}
