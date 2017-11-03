import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Injectable, Injector } from "@angular/core";

import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from "./authentication.service";

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Workaround:
    // https://github.com/angular/angular/issues/18224#issuecomment-316957213
    const auth = this.injector.get(AuthenticationService);

    if (!auth.isAuthenticated) {
      return next.handle(req);
    }

    const tokenType: string = 'Bearer';
    const token: string = auth.token;
    const authReq = req.clone({
      setHeaders: { Authorization: `${tokenType} ${token}` }
    });
    return next.handle(authReq);
  }
}
