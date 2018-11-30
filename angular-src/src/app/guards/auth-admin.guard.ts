import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate


{

  constructor(public auth: AuthService, public router: Router){

  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticatedAdmin()) {
      this.router.navigate(['/admin','login']);
      return false;
    }
    return true;
  }


}
