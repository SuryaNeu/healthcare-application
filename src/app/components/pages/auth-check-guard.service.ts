import {inject} from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const AuthCheckGuard = () => {
  const router = inject(Router);
  const Cookie = inject(CookieService);
  if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null) {

    return true;

  } else {

    router.navigate(['/profile']);

    return false;

  }
}