import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private shoppingCartItems: any[] = [];

  constructor() {}

  getShoppingCartItems() {
    return this.shoppingCartItems;
  }

  addToCart(product: any) {
    this.shoppingCartItems.push(product);
  }

  removeFromCart(index: number) {
    this.shoppingCartItems.splice(index, 1);
  }

}

