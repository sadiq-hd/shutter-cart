// shopping-cart.component.ts
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: any[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private translate: TranslateService,
    private router: Router // حقن خدمة Router هنا

  ) {}

  ngOnInit(): void {
    this.shoppingCartItems = this.shoppingCartService.getShoppingCartItems();
  }
  

  // دالة لإزالة المنتج من العربة
  removeFromCart(index: number) {
    this.shoppingCartService.removeFromCart(index);
  }

  // دالة لحساب المجموع الفرعي لعنصر العربة
  calculateSubtotal(item: any): number {
    // قم بحساب المجموع الفرعي هنا بناءً على سعر العنصر والكمية إذا كانت متاحة
    return item.price * (item.quantity || 1);
  }
  

  // دالة لحساب الإجمالي لجميع العناصر في العربة
  calculateTotal(): number {
    let total = 0;
    for (const item of this.shoppingCartItems) {
      total += this.calculateSubtotal(item);
    }
    return total;
  }
  navigateToPayment() {
    this.router.navigate(['/payment']); // قم بتغيير '/payment' إلى المسار الصحيح لصفحة الدفع
  }
}

