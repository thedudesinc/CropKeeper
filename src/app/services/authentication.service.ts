import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginInput, LoginOutput } from './models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public changeAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.loadState());
  public isAuthenticated$: Observable<boolean> = this.changeAuthenticated.asObservable();

  private baseUrl = environment.baseUrl + '/authentication/login';
  constructor(private http: HttpClient) { }

  loadState(): boolean {
    const localStorageToken = localStorage.getItem('token');
    return !!localStorageToken;
  }

  authenticate(login: LoginInput): Observable<boolean> {
    return this.http.post<LoginOutput>(this.baseUrl, login).pipe(
      map((response) => {
        const isAuthenticated = !!response.value && response.statusCode === 200;
        this.changeAuthenticated.next(isAuthenticated);
        if (isAuthenticated) localStorage.setItem('token', response.value ?? '');
        return isAuthenticated;
      })
    );
  }
}
