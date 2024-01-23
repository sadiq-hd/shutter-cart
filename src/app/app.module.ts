import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ProductDetailsComponent } from './admin/product-details/product-details.component';
import { EmployeeRegistrationComponent } from './admin/employee-registration/employee-registration.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';
import { ReceiveProductsComponent } from './admin/receive-products/receive-products.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarSecondaryComponent } from './navbar-secondary/navbar-secondary.component';
import { CategoryPageComponent } from './category-page/category-page.component';

// تحميل الملفات المترجمة
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    HomeComponent,
    MainLoginComponent,
    ManageUsersComponent,
    ProductListComponent,
    AddProductComponent,
    ProductDetailsComponent,
    EmployeeRegistrationComponent,
    ShoppingCartComponent,
    PaymentComponent,
    SellerAddProductComponent,
    ReceiveProductsComponent,
    FooterComponent,
    SidebarComponent,
    NavbarSecondaryComponent,
    CategoryPageComponent,
    AdminDashboardComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbDropdownModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgbModule,
    // تكوين وحدة الترجمة
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]  // تعتمد على HttpClient
      }
    }),
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
