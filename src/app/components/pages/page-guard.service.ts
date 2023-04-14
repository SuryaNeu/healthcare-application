import {inject} from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const PageGuard = () => {
  const router = inject(Router);
  const Cookie = inject(CookieService);
  if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null) {

    router.navigate(['/login']);

    return false;

  } else {

    return true;

  }
}