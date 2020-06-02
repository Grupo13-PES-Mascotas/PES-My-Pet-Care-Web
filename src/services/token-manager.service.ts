import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagerService {
  private tok: string;

  constructor() {
    this.tok = '';
  }

  get token(): string {
    return this.tok;
  }

  set token(value: string) {
    this.tok = value;
  }
}
