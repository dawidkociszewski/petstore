import {Injectable, signal, WritableSignal} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {PetBuilder} from '../helpers/pet-builder';
import {ITag} from '../interfaces/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  public submitted: WritableSignal<boolean> = signal(false);
  public form: FormGroup = PetBuilder.generateForm();

  public parsePhotos(photoUrls: string[]): void {
    (this.form.get('photoUrls') as FormArray).clear();
    photoUrls.map((photoUrl: string): void => {
      (this.form.get('photoUrls') as FormArray).controls.push(new FormControl<string>(photoUrl));
    })
  }

  public parseTags(tags: ITag[]): void {
    tags.map((tag: ITag): void => {
      (this.form.get('tags') as FormArray).controls.push(new FormGroup({
        id: new FormControl<number>(tag.id),
        name: new FormControl<string>(tag.name)
      }));
    })
  }

  public reset(): void {
    this.form = PetBuilder.generateForm();
    this.submitted.set(false);
  }
}
