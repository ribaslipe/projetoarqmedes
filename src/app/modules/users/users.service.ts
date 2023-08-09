import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Usuario } from './models/Usuario';
import { environment } from "src/environments/environment.Dev";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = `${environment.url_API}/users`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }

  updateUser(user: Usuario): Observable<Usuario> {
    const url = `${this.url}/${user.id}`;
    return this.http.put<Usuario>(url, user);
  }

  saveUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, user);
  }

  async validateCPF(cpf: string): Promise<boolean> {
    const users = await this.http.get<any[]>(`${this.url}?cpf=${cpf}`).toPromise();
    return users !== undefined && users.length === 0;
  }

  async validateEmail(email: string): Promise<boolean> {
    const users = await this.http.get<any[]>(`${this.url}?email=${email}`).toPromise();
    return users !== undefined && users.length === 0;
  }

}
