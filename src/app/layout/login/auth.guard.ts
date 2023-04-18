import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service'

export const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(AuthenticationService)
    .isAuthenticated$
    .pipe(
      map((isAuthenticated) =>
        isAuthenticated ? true : createUrlTreeFromSnapshot(next, ['/', 'login'])
      )
    );
};
