import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPet, PetStatus} from '../interfaces/pet';

@Injectable({
  providedIn: 'root'
})
export class PetApiService {

  constructor(private readonly httpClient: HttpClient) {
  }

  public getList(param: PetStatus): Observable<IPet[]> {
    return this.httpClient.get<IPet[]>(`https://petstore.swagger.io/v2/pet/findByStatus?status=${param}`,
    );
  }

  public addPet(pet: IPet): Observable<IPet> {
    return this.httpClient.post<IPet>(`https://petstore.swagger.io/v2/pet`, pet);
  }

  public editPet(pet: IPet): Observable<IPet> {
    return this.httpClient.put<IPet>(`https://petstore.swagger.io/v2/pet/`, pet);
  }

  public removePet(id: number): Observable<IPet> {
    return this.httpClient.delete<IPet>(`https://petstore.swagger.io/v2/pet/${id}`);
  }

  public getPet(id: number): Observable<IPet> {
    return this.httpClient.get<IPet>(`https://petstore.swagger.io/v2/pet/${id}`);
  }

}
