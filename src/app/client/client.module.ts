import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { HomeClientComponent } from './home-client/home-client.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { HeaderClientComponent } from './header-client/header-client.component';


@NgModule({
  declarations: [
    HomeClientComponent,
    ViewProductsComponent,
    HeaderClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
