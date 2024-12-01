import {Component} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  standalone: true,
})
export class SpinnerComponent {

}
