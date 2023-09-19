import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginInput, LoginOutput } from './models/authentication.model';
import { LoginResponse } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public changeUser: BehaviorSubject<LoginResponse | undefined> =
    new BehaviorSubject(this.loadState());
  public user$: Observable<LoginResponse | undefined> =
    this.changeUser.asObservable();

  private baseUrl = environment.baseUrl + '/authentication/login';
  constructor(private http: HttpClient) {}

  loadState(): LoginResponse | undefined {
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser === null) return undefined;
    return JSON.parse(localStorageUser);
  }

  authenticate(login: LoginInput): Observable<boolean> {
    return this.http.post<LoginResponse>(this.baseUrl, login).pipe(
      map((response) => {
        const isAuthenticated = !!response.stringToken;
        this.changeUser.next(response);
        if (isAuthenticated)
          localStorage.setItem('user', JSON.stringify(response));
        return isAuthenticated;
      })
    );
  }
}
