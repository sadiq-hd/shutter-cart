// employee-registration.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.css'],
})
export class EmployeeRegistrationComponent implements OnInit {
  employeeRegistrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const randomEmployeeId = Math.floor(100000 + Math.random() * 900000);
    this.employeeRegistrationForm = this.fb.group({
      role: ['employee'],
      id: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      EmployeeId: [randomEmployeeId, [Validators.required]],

    });
  }

  onSubmit() {
    if (this.employeeRegistrationForm.valid) {
      this.authService
        .RegisterUser(this.employeeRegistrationForm.value)
        .subscribe(
          (result) => {
            this.toastr.success('تم تسجيل الموظف بنجاح');
            // قم بتوجيه المستخدم إلى الصفحة التي ترغب فيها بعد التسجيل
            this.router.navigate(['dashboard']);
          },
          (error) => {
            this.toastr.warning('حدث خطأ أثناء التسجيل.');
          }
        );
    } else {
      this.toastr.warning('الرجاء إدخال بيانات صحيحة.');
    }
  }
}
