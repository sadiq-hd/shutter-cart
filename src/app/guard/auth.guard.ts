import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isloggedin()) {
      // إذا كان المستخدم قد قام بتسجيل الدخول بالفعل، فلا يجب أن نسمح له بالوصول إلى صفحة تسجيل الدخول مرة أخرى.
      if (state.url === '/main-login') {
        this.router.navigate(['/home']);
        return false;
      }
  
      if (this.authService.isExternalSeller()) {
        if (state.url !== '/external-seller/external-seller-home') {
          this.router.navigate(['/external-seller/external-seller-home']);
          return false;
        }
      }
      return true;
    } else {
      if (state.url !== '/main-login') { 
        this.router.navigate(['/main-login']);
        return false;
      }
      return true;
    }
  }
}