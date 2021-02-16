// import { Injectable } from "@angular/core";
// import {
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   ActivatedRouteSnapshot
// } from "@angular/router";

// @Injectable()
// export class AuthGuardService implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): boolean {
//     const isLoggedIn = false;
//     if (isLoggedIn) {
//       return true;
//     } else {
//       // this.router.navigate(["/login"]);
//       return false;
//     }
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from
    '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service.service';
import { Router } from '@angular/router';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private auth: AuthService,
        private myRoute: Router) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isLoggedIn()) {
            return true;
        } else {
            // this.myRoute.navigate(["login"]);
            return false;
        }
    }
}


