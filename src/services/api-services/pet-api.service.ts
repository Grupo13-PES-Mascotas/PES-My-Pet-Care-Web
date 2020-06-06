import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenManagerService} from '../token-manager.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Pet} from '../../interfaces/pet';

@Injectable({
  providedIn: 'root'
})
export class PetApiService {
  private url = 'https://pes-my-pet-care.herokuapp.com/pet';
  private storageUrl = 'https://pes-my-pet-care.herokuapp.com/storage';
  private headers;

  constructor(
    private http: HttpClient,
    private tokenManager: TokenManagerService
  ) {
    const token = this.tokenManager.token;
    this.headers = new HttpHeaders().set('token', token);
  }

  getPet(petName: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.url}/${petName}`, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json'
    })
      .pipe(
        catchError(this.handleError<any>('getPet'))
      );
  }

  getPetImage(username: string, petName: string): Observable<string>{
    return this.http.get(`${this.storageUrl}/image/${username}/pets/${petName}-profile-image.png`, {
      headers: this.headers,
      observe: 'body',
      responseType: 'text'
    })
      .pipe(
        catchError(this.handleError<any>('getPetImage'))
      );
  }

  getPetOld(username: string, petName: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.url}/${username}/${petName}`, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json'
    })
      .pipe(
        catchError(this.handleError<any>('getPetOld'))
      );
  }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json'
    })
      .pipe(
        catchError(this.handleError<any>('getAllPets'))
      );
  }

  getAllPetsOld(username: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.url}/${username}`, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json'
    })
      .pipe(
        catchError(this.handleError<any>('getAllPetsOld'))
      );
  }

  createPet(petName: string, body: object): Observable<Pet> {
    return this.http.post(`${this.url}/${petName}`, body,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        catchError(this.handleError<any>(`createPet`))
      );
  }

  createPetOld(username: string, petName: string, body: object): Observable<Pet> {
    return this.http.post(`${this.url}/${username}/${petName}`, body,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        catchError(this.handleError<any>(`createPetOld`))
      );
  }

  deletePet(petName: string): Observable<any> {
    return this.http.delete(`${this.url}/${petName}`,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        catchError(this.handleError(`deletePet`))
      );
  }

  deletePetOld(username: string, petName: string): Observable<any> {
    return this.http.delete(`${this.url}/${username}/${petName}`,
      {
        headers: this.headers,
        observe: 'body',
        responseType: 'json'
      })
      .pipe(
        catchError(this.handleError(`deletePetOld`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error + 'in operation: ' + operation);
      return of(result as T);
    };
  }
}
