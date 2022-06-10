import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router,private httpClient: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() != null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(["login"]);
  }

  login(data:User): Observable<any>{   
    return this.httpClient.post(`${environment.api_base_url}api/login`,data);
  }

  resetPassword(data:User): Observable<any>{
    return this.httpClient.post(`${environment.api_base_url}api/reset`,data);
  }

  register(data:User): Observable<any>{
    return this.httpClient.post(`${environment.api_base_url}api/user`,data);
  }

  GetData(email:string): Observable<any>{
    return this.httpClient.get<User>(`${environment.api_base_url}api/reset/${email}`)
  }
}
