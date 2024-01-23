import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { HeaderSellerComponent } from './header-seller/header-seller.component';
import { ExternalSellerHomeComponent } from './external-seller-home/external-seller-home.component';


@NgModule({
  declarations: [
    HeaderSellerComponent,
    ExternalSellerHomeComponent,
    
  ],
  imports: [
    CommonModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
