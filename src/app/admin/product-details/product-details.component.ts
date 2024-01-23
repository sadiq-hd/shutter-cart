import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId!: number; // لتخزين معرف المنتج
  product: any = {}; // لتخزين تفاصيل المنتج


  constructor(
    private productService: ProductService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService

  ) {}

 ngOnInit(): void {
    // استخدام ActivatedRoute للحصول على معرف المنتج من الرابط
    this.route.params.subscribe(params => {
      this.productId = +params['productId'];
      // استخدام معرف المنتج لاستدعاء تفاصيل المنتج من الخدمة
      this.fetchProductDetails();
    });
  }

  fetchProductDetails() {
    this.productService.getProductDetails(this.productId).subscribe(
      (data: any) => {
        this.product = data;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }


  addToCart(product: any) {
    this.shoppingCartService.addToCart(product);

  }
}
