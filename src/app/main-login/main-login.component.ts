import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css'],
})
export class MainLoginComponent {
  constructor(
    private builder: FormBuilder, 
    private toastr: ToastrService, 
    private authService: AuthService, 
    private router: Router
  ) {}

  loginForm = this.builder.group({
    id: this.builder.control('', [Validators.required]),
    password: this.builder.control('', Validators.required),
    activationCode: ['']

  });
  isActivationRequired = false;
  proceedlogin() {
    if (this.loginForm.valid) {
      const id = this.loginForm.get('id')!.value as string;
      const password = this.loginForm.get('password')!.value as string;
  
      this.authService.login(id, password).subscribe(user => {
        if (user) {
          if (!user.isactive) {
            this.isActivationRequired = true; // تعيين الخاصية هنا

            // المستخدم غير مفعل
            this.toastr.warning('Your account is not activated. Please check your email.');
          } else {
            // المستخدم مفعل
            sessionStorage.setItem('userId', user.id);
            sessionStorage.setItem('role', user.role);
  
            // التوجيه بناءً على دور المستخدم
            switch (user.role) {
              case 'admin':
                this.router.navigate(['/admin-dashboard']); // توجيه المسؤول إلى لوحة التحكم
                break;
              case 'ExternalSeller':
                this.router.navigate(['external-seller-home']);
                break;
                case 'employee':
                  this.router.navigate(['/admin-dashboard']);
                  break;            
                  
                  default:
                this.router.navigate(['home']); // توجيه الأدوار الأخرى إلى الصفحة الرئيسية
                break;
            }
            this.toastr.success('Login successful!');
          }
        } else {
          this.toastr.error('Invalid credentials.');
        }
      }, error => {
        this.toastr.error('Login failed. Please try again.');
      });
    } else {
      this.toastr.warning('Please enter valid credentials.');
    }
  }
  activateAccount() {
    const id = this.loginForm.get('id')!.value as string;
    const activationCode = this.loginForm.get('activationCode')!.value as string;

    this.authService.activateAccount(id, activationCode).subscribe({
      next: (response) => {
        if (response.isActivated) {
          this.toastr.success('Account activated successfully.');
          this.router.navigate(['home']);
        } else {
          this.toastr.error('Invalid activation code.');
        }
      },
      error: (error) => {
        this.toastr.error('Activation failed. Please try again.');
        console.error(error);
      }
    });
  }
}