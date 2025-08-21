import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ClientesListComponent } from './pages/clientes/clientes-list.component';
import { ClienteModalComponent } from './pages/clientes/cliente-modal.component';
import { ClientesInsertComponent } from './pages/clientes/clientes-insert.component';
import { ClientesUpdateComponent } from './pages/clientes/clientes-update.component';
import { ClientesDeleteComponent } from './pages/clientes/clientes-delete.component';
import { ClientesViewComponent } from './pages/clientes/clientes-view.component';

import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesListComponent, canActivate: [AuthGuard] },
  { path: 'clientes/insert', component: ClientesInsertComponent, canActivate: [AuthGuard] },
  { path: 'clientes/update/:id', component: ClientesUpdateComponent, canActivate: [AuthGuard] },
  { path: 'clientes/delete/:id', component: ClientesDeleteComponent, canActivate: [AuthGuard] },
  { path: 'clientes/view/:id', component: ClientesViewComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ClientesListComponent,
    ClienteModalComponent,
    ClientesInsertComponent,
    ClientesUpdateComponent,
    ClientesDeleteComponent,
    ClientesViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
