import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ClientType } from '../enums/client-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthenticationService
  implements CanActivateChild {
  constructor(private router: Router) {}
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const clientType: string = sessionStorage.getItem('clientType');
    if (clientType != null && clientType == ClientType.ADMINISTRATOR) {
      return true;
    } else {
      sessionStorage.clear();
      this.router.navigate(['/couponsystem/unauthorized']);
      return false;
    }
  }
}
