import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AddComponent} from '../add/add.component';

@Component({
  selector: 'app-edit',
  imports: [
    AddComponent
  ],
  templateUrl: './edit.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent {

}
