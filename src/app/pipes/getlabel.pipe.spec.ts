import { GetLabelPipe } from './getlabel.pipe';
import {MapStatus} from '../const/status';
import {PetStatus} from '../interfaces/pet';

describe('GetlabelPipe', () => {
  const pipe = new GetLabelPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('return label of a given map',()=>{
      expect(pipe.transform(PetStatus.AVAILABLE, MapStatus)).toEqual('Available');
  })
});
