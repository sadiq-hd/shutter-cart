import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { AuthGuard } from './guard/auth.guard';
import { ExternalSellerHomeComponent } from './seller/external-seller-home/external-seller-home.component';
// import { MyAccountComponent } from './my-account/my-account.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ProductDetailsComponent } from './admin/product-details/product-details.component';
import { EmployeeRegistrationComponent } from './admin/employee-registration/employee-registration.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PaymentComponent } from './payment/payment.component';
import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';
import { ReceiveProductsComponent } from './admin/receive-products/receive-products.component';
import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'main-login', component: MainLoginComponent, canActivate: [AuthGuard] },
  { path: 'external-seller', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule) },
  { path: 'customer', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'external-seller-home', component: ExternalSellerHomeComponent },
  { path: 'home', component: HomeComponent },
  // {path: 'my-account', component:MyAccountComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'product/:productId', component: ProductDetailsComponent },
  { path: 'product-list', component: ProductListComponent },

  { path: 'employee-registration', component: EmployeeRegistrationComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'receive-products', component:ReceiveProductsComponent  },

  { path: 'seller-add-product', component: SellerAddProductComponent},
  { path: 'products', component: CategoryPageComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
