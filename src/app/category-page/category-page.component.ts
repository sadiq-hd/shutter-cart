import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  products: any[] = [];
  category: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService

  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      // فلترة المنتجات بناءً على التصنيف، إذا لزم الأمر
      this.products = products.filter(product => product.category === this.category);
    });
  }

  addToCart(product: any) {
    this.shoppingCartService.addToCart(product);

  }
}