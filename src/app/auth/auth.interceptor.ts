import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtoken = JSON.parse(localStorage.getItem('jwtuser'));
    if (jwtoken && jwtoken.token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtoken.token}`
        }
      });
    }
    return next.handle(req);
  }
}