import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(tap(resp => {
        localStorage.setItem(this.tokenKey, resp.token);
        localStorage.setItem(this.userKey, JSON.stringify(resp.user));
      }));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername() {
    const u = localStorage.getItem(this.userKey);
    return u ? JSON.parse(u).username : '';
  }
}
