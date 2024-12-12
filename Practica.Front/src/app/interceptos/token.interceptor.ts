import { HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Injectable } from '@angular/core';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem(environment.token);
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
}
}

