import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {LabelMap, MapStatus} from '../../const/status';
import {PetService} from '../../services/pet.service';
import {Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NotificationService} from '../../services/notification.service';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {TagFormControls, TagFormGroup} from '../../interfaces/form';
import {ITag} from '../../interfaces/pet';
import {PetApiService} from '../../services/pet-api.service';
import {iif} from 'rxjs';
import {petAdded, petUpdated, required, sendValidation} from '../../const/alerts';
import {generateId} from '../../helpers/generate-id';

@Component({
  selector: 'app-add',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatIcon,
    MatChipsModule
  ],
  templateUrl: './add.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnDestroy {
  protected readonly availableStatus: LabelMap[] = MapStatus;
  protected readonly required = required;

  constructor(public readonly petService: PetService, private readonly utils: NotificationService,
              private readonly apiService: PetApiService, private readonly router: Router) {
  }

  get form(): FormGroup {
    return this.petService.form;
  }

  get photoUrls(): FormArray {
    return this.form.get('photoUrls') as FormArray<FormControl<string>>;
  }

  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  public addPhoto(): void {
    this.photoUrls.controls
      .push(new FormControl<string>(null, [Validators.required]));
    this.photoUrls.updateValueAndValidity();
  }

  public removePhoto(i: number) {
    this.photoUrls.removeAt(i)
    this.photoUrls.updateValueAndValidity();
  }

  public updatePhotoUrl(): void {
    this.photoUrls.updateValueAndValidity();
  }

  public addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(new FormGroup({
        id: new FormControl<number>(generateId()),
        name: new FormControl<string>(value),
      } as TagFormControls) as TagFormGroup);
    }
    event.chipInput!.clear();
  }

  public removeTag(tag: ITag): void {
    const index = this.tags.controls.findIndex((fg: TagFormGroup) => fg.get('name').value === tag.name);
    if (index >= 0) {
      this.tags.controls.splice(index, 1);
      this.tags.updateValueAndValidity();
    }
  }

  public send(): void {
    const isNewPet: boolean = !!this.form.value.id;
    this.petService.submitted.set(true);
    this.petService.form.markAllAsTouched();
    if (!this.petService.form.valid) {
      this.utils.showNotification(sendValidation)
      return;
    }
    iif(() => isNewPet, this.apiService.editPet(this.form.value), this.apiService.addPet(this.form.value))
      .subscribe({
        next: (): void => {
          void this.router.navigate(['list']).then(() =>
            this.utils.showNotification(isNewPet ? petUpdated : petAdded),
          );
        },
        error: (error): void => {
          if (error?.error) {
            this.utils.showNotification(error.message)
          }
        }
      })
  }

  ngOnDestroy(): void {
    this.petService.reset();
  }
}
