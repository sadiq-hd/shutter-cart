import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    
    HeaderAdminComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    

  ]
})
export class AdminModule { }
