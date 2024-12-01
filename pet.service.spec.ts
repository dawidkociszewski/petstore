import {TestBed} from '@angular/core/testing';
import {PetService} from './pet.service';
import {ITag} from '../interfaces/pet';
import {FormArray} from '@angular/forms';

const mockDataPhotos: string[] = ['string', 'test']
const mockDataTags: ITag[] = [{id: 1, name: 'string'}, {id: 2, name: 'test'}]

describe('PetService', () => {
  let service: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('parse response for photos', () => {
    service.parsePhotos(mockDataPhotos);
    expect((service.form.get('photoUrls') as FormArray).controls[0].value).toEqual('string');
    expect((service.form.get('photoUrls') as FormArray).length).toEqual(2);
  })

  it('parse response for tags', () => {
    service.parseTags(mockDataTags);
    expect((service.form.get('tags') as FormArray).controls[1].get('name').value).toEqual('test');
    expect((service.form.get('tags') as FormArray).length).toEqual(2);
  })
});
