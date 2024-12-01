import {Pipe, PipeTransform} from '@angular/core';
import {LabelMap} from '../const/status';

@Pipe({
  name: 'getLabel',
  standalone: true
})
export class GetLabelPipe implements PipeTransform {
  transform(value: string, labelMap: LabelMap[]): string {
    return labelMap.find((item: LabelMap):boolean => (item.value === value))?.label;
  }
}
