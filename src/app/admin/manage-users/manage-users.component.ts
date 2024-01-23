// ... تأكد من استيراد FormsModule و ReactiveFormsModule في وحدتك

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  constructor(private builder: FormBuilder, private service: AuthService) {
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;

  LoadUser() {
    this.service.Getall().subscribe(res => {
      this.userlist = res;
      this.dataSource = this.userlist;
    });
  }

  // دالة لتفعيل المستخدم
  activateUser(user: any) {
    user.isactive = true;
    this.service.updateuser(user.id, user).subscribe(res => {
      alert('User activated successfully!');
      this.LoadUser();
    });
  }

  changeUserRole(user: any, newRole: string) {
    user.role = newRole;
    this.service.updateuser(user.id, user).subscribe(res => {
      alert('User role updated successfully!');
      this.LoadUser();
    });
  }
  deactivateUser(user: any) {
    user.isactive = false;
    this.service.updateuser(user.id, user).subscribe(res => {
        alert('User deactivated successfully!');
        this.LoadUser();
    });
}

  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    this.LoadUser();
  }
}
