import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginInput } from './models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.baseUrl + '/authentication/login';
  constructor(private http: HttpClient) { }

  authenticate(login: LoginInput): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl, login);
  }
}
