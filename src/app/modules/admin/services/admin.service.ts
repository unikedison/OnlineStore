import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/classes/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  GetUserDetails() {
    return this.httpClient.get<User[]>(`${environment.api_base_url}api/user`)
  }

  GetUserById(id: string) {
    return this.httpClient.get<User>(`${environment.api_base_url}api/user/${id}`)
  }

  UpdateUser(id: string, data:User) {
    return this.httpClient.put(`${environment.api_base_url}api/user/${id}`,data)
  }

  DeleteUser(id: string) {
    return this.httpClient.delete(`${environment.api_base_url}api/user/${id}`)
  }
}
