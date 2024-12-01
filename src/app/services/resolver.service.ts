import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {catchError, Observable, of, tap} from 'rxjs';
import {IPet} from '../interfaces/pet';
import {PetApiService} from './pet-api.service';
import {PetService} from './pet.service';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {
  constructor(private apiService: PetApiService, private readonly router: Router,
              private readonly utils: NotificationService, private readonly petService: PetService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IPet> {
    return this.apiService.getPet(+route.paramMap.get('id')).pipe(
      tap((pet: IPet) => {
        this.petService.form.patchValue(pet);
        this.petService.parsePhotos(pet.photoUrls)
        this.petService.parseTags(pet.tags)
      }),
      catchError((error) => {
        void this.router.navigate(['list']).then((): void => {
            if (error?.error) {
              this.utils.showNotification(error.message)
            }
          }
        );
        return of(null);
      })
    );
  }
}
