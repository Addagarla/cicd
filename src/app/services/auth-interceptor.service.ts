import { Injectable, Provider } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SessionStorageService } from './session-storage.service';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class AuthTokenHttpInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  constructor(
    private _authService: AuthService,
    private _sessionStorage: SessionStorageService,
    private loadingService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: string =
      this._authService.idToken ||
      this._sessionStorage.getString('access_token');
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}

export const AuthTokenHttpInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthTokenHttpInterceptor,
  multi: true
};
