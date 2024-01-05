import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor(private router: Router, private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userItem = localStorage.getItem('user');
    if (userItem) {
      const user = JSON.parse(userItem);
      if (user.stringToken) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${user.stringToken}` },
        });
      }
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !request.url.includes('api/authentication/login')
        ) {
          this.router.navigate(['login']);
        }
        this.loadingService.changeLoadingVisible.next(false);
        throw error;
      })
    );
  }
}
