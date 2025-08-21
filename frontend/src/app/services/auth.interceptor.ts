import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLogin = req.url.includes('/auth/login');

    let request = req;
    const token = this.auth.getToken();
    if (token && !isLogin) {
      request = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401 && !isLogin) {
            this.auth.logout();
            this.router.navigate(['/login']);
          }
          return throwError(() => err);
        })
    );
  }
}
