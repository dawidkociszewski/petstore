import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListComponent} from './list.component';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {MatTable, MatTableModule} from '@angular/material/table';
import {Router} from '@angular/router';
import {PetApiService} from '../../services/pet-api.service';
import {IPet} from '../../interfaces/pet';
import {of} from 'rxjs';

const mockValue: IPet[] = [{
  "id": 703850,
  "category": {
    "id": 2020,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
},
  {
    "id": 9223372036854774320,
    "category": {
      "id": 0,
      "name": "Jerry"
    },
    "name": "Mouse",
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 0,
        "name": "Mouse"
      }
    ],
    "status": "available"
  }];
const expectedValue: IPet[] = [{
  "id": 703850,
  "category": {
    "id": 2020,
    "name": "string"
  },
  "name": "doggie",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
}];

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let routerStub;
  let apiService;

  beforeEach(async () => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };
    await TestBed.configureTestingModule({
      imports: [ListComponent, MatTableModule],
      providers: [provideHttpClient(), provideAnimations(), {
        provide: Router,
        useValue: routerStub
      }, PetApiService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(PetApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have list of pets', () => {
    const pets = fixture.debugElement.query(By.directive(MatTable));
    expect(pets).toBeTruthy();
  });

  it('should have button new pet', () => {
    const addNew = fixture.debugElement.query(debugEl => debugEl.name === 'button' && debugEl.nativeElement.textContent === 'Add new pet');
    expect(addNew).toBeTruthy();
  });

  it('should navigate to new pet page', () => {
    component.addPet();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/add-pet']);
  })

  it('should navigate to edit pet page', () => {
    component.edit(2);
    expect(routerStub.navigate).toHaveBeenCalledWith([`/edit-pet/2`]);
  })

  it('should navigate to details pet page', () => {
    component.details(2);
    expect(routerStub.navigate).toHaveBeenCalledWith(['/details-pet/2']);
  })

  it('should search by name & display 1 element', () => {
    spyOn(apiService, 'getList').and.returnValue(of(mockValue));
    component.searchForm.get('name').setValue('doggie');
    component.search();
    const existingFirstElement = component.dataSource.filteredData[0];
    const expectedFirstElement = expectedValue[0];

    expect(existingFirstElement.id).toBe(expectedFirstElement.id);
    expect(component.dataSource.filteredData.length).toBe(1);
    expect(apiService.getList).toHaveBeenCalled();
  });

});
