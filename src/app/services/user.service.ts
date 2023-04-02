import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInput, UserOutput } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl + '/user';
  constructor(private http: HttpClient) { }

  create(user: UserInput): Observable<UserOutput> {
    return this.http.post<UserOutput>(this.baseUrl, user);
  }
}