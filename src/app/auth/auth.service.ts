import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.Dev";
import { Observable } from 'rxjs';
import { Usuario } from '../modules/users/models/Usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Usuario | null = null;

  constructor(private http: HttpClient,  private router: Router) {}

  login(username: string, password: string): Observable<Usuario[]> {
    var url = `${environment.url_API}/users`
    return this.http.get<Usuario[]>(url, {
      params: { email: username, password },
    });
  }

  public Authenticated(): boolean {
    if(localStorage['user_data']) {
      return true;
    }else{
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('user_data');
    this.router.navigate(['/']);
  }

}
