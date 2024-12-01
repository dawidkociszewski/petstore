import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {PetService} from '../../services/pet.service';
import {RouterLink} from '@angular/router';
import {MatAnchor} from '@angular/material/button';
import {IPet} from '../../interfaces/pet';
import {MapStatus} from '../../const/status';
import {GetLabelPipe} from '../../pipes/getlabel.pipe';

@Component({
  selector: 'app-details',
  imports: [
    MatCard,
    MatCardContent,
    MatAnchor,
    RouterLink,
    GetLabelPipe
  ],
  templateUrl: './details.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnDestroy {
  protected readonly availableStatus = MapStatus;

  constructor(public readonly petService: PetService) {
  }

  get formValue(): IPet {
    return this.petService.form.value;
  }

  ngOnDestroy(): void {
    this.petService.reset();
  }
}
