// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../service/auth.service';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 'app-my-account',
//   templateUrl: './my-account.component.html',
//   styleUrls: ['./my-account.component.css']
// })
// export class MyAccountComponent implements OnInit {
//   user: any;
//   userOrders: any[] = [];
//   currentSection = 'accountDetails';

//   constructor(private authService: AuthService, private translate: TranslateService) {}

//   ngOnInit(): void {
//     this.loadUserData();
//     this.loadUserOrders();
//   }

//   loadUserData() {
//     const userId = 'someUserId';
//     this.authService.GetUserbyCode(userId).subscribe((data) => {
//       this.user = data;
//     });
//   }

//   // loadUserOrders() {
//   //   const userId = 'someUserId';
//   //   this.authService.getUserOrders(userId).subscribe((orders: any) => {
//   //     this.userOrders = orders;
//   //   });
//   // }

//   showSection(section: string): void {
//     this.currentSection = section;
//   }

//   editUsername() {
//     this.user.username = 'newUsername';
//   }
  
//   editEmail() {
//     this.user.email = 'newEmail@example.com';
//   }
  
//   editAddress() {
//     this.user.address = 'newAddress';
//   }
  
//   changePassword() {
//     const newPassword = 'newPassword';
//   }
// }
