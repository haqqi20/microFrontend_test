import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {BasicAuthenticationService} from './basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

    constructor(
        private authService: BasicAuthenticationService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (this.authService.isUserLoggedIn()) {
          console.log('user logged in');
          return true;
      }else{
          this.router.navigate(['login']);
      }

      return false;
    }


}
