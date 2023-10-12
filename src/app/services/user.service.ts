import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInput, UserOutput } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl + '/user';
  constructor(private http: HttpClient) {}

  create(user: UserInput): Observable<UserOutput> {
    return this.http.post<UserOutput>(this.baseUrl, user);
  }

  verifyEmail(email: string, omittedEmail: string): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseUrl + '/verifyemail',
      { email, omittedEmail },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  update(id: string, user: UserInput): Observable<UserOutput> {
    return this.http.put<UserOutput>(this.baseUrl + '/' + id, user);
  }

  get(id: string): Observable<UserOutput> {
    return this.http.get<UserOutput>(this.baseUrl + '/' + id);
  }
}
