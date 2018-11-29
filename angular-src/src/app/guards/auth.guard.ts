import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router){}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['inicio']);
      return false;
    }
    return true;
  }
}
