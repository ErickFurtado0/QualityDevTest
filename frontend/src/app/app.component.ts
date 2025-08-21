import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Clientes</a>
      <div class="d-flex" *ngIf="auth.isLoggedIn()">
        <span class="navbar-text me-3">Olá, {{auth.getUsername()}}</span>
        <button class="btn btn-outline-light btn-sm" (click)="logout()">Sair</button>
      </div>
    </div>
  </nav>
  <div class="container py-4">
      <div class="mb-3" *ngIf="auth.isLoggedIn()">
        <a class="btn btn-sm btn-outline-light me-2" routerLink="/">Home</a>
        <a class="btn btn-sm btn-outline-light me-2" routerLink="/clientes">Listar</a>
        <a class="btn btn-sm btn-outline-light" routerLink="/clientes/insert">Inserir</a>
      </div>
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
