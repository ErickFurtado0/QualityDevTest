import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  private tokenKey = 'token';
  private userKey = 'user';

  isLoggedIn() { return !!localStorage.getItem(this.tokenKey); }
  getToken()   { return localStorage.getItem(this.tokenKey); }

  listClientes(filtros: any): Observable<Cliente[]> {
    let params = new HttpParams();
    for (const key of Object.keys(filtros)) {
      if (filtros[key]) params = params.set(key, filtros[key]);
    }
    return this.http.get<Cliente[]>(`${environment.apiUrl}/clientes`, { params });
  }
  getCliente(id: number) {
    return this.http.get<Cliente>(`${environment.apiUrl}/clientes/${id}`);
  }
  createCliente(c: Partial<Cliente>) {
    return this.http.post<Cliente>(`${environment.apiUrl}/clientes`, c);
  }
  updateCliente(id: number, c: Partial<Cliente>) {
    return this.http.put<Cliente>(`${environment.apiUrl}/clientes/${id}`, c);
  }
  deleteCliente(id: number) {
    return this.http.delete(`${environment.apiUrl}/clientes/${id}`);
  }
}
