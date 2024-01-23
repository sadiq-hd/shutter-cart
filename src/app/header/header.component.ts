import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  isExternalSeller: boolean = false;
  private authSubscription!: Subscription;
  private roleSubscription!: Subscription;  // إضافة اشتراك لتغييرات الدور
  customDropdownClass = ''; 
  currentLanguage: string = 'en';

  constructor(
    public authService: AuthService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.loginStatusChanged.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      // عند تغيير حالة تسجيل الدخول، قم بتحديث الدور
      if (status) {
        this.updateUserRole();
      } else {
        this.resetUserStatus();
      }
    });

    // استمع إلى تغييرات الدور
    this.roleSubscription = this.authService.currentRole.subscribe(role => {
      this.updateUserRole();
    });

    this.updateUserStatus();
    this.translateService.setDefaultLang(this.currentLanguage);
    this.translateService.use(this.currentLanguage);
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  private updateUserStatus() {
    this.isLoggedIn = this.authService.isloggedin();
    this.updateUserRole();
  }
  private updateUserRole() {
    this.isAdmin = this.authService.isAdmin();
    this.isEmployee = this.authService.isEmployee();
    this.isExternalSeller = this.authService.isExternalSeller();
    // طباعة الأدوار للتصحيح
    console.log('Admin:', this.isAdmin, 'Employee:', this.isEmployee, 'ExternalSeller:', this.isExternalSeller);
  }

  
  private resetUserStatus() {
    this.isAdmin = false;
    this.isEmployee = false;
    this.isExternalSeller = false;
  }

  logout() {
    this.authService.logout(); 
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translateService.use(lang);
  }
}
