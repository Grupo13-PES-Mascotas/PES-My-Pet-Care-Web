import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenManagerService} from '../token-manager.service';
import {Observable, of} from 'rxjs';
import {User} from '../../interfaces/user';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private url = 'https://pes-my-pet-care.herokuapp.com/users';
  private headers;

  constructor(
    private http: HttpClient,
    private tokenManager: TokenManagerService
  ) {
    const token = this.tokenManager.token;
    this.headers = new HttpHeaders().set('token', token);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.url, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json'
    })
      .pipe(
        catchError(this.handleError<any>('getUser'))
      );
  }

  getUserOld(username: string): Observable<any> {
    return this.http.get<User>(`${this.url}/${username}`, {
      headers: this.headers,
      observe: 'body',
      responseType: 'json'
    })
      .pipe(
        catchError(this.handleError<any>('getUserOld'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error + 'in operation: ' + operation);
      return of(result as T);
    };
  }
}

