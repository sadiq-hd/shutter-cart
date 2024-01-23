import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-receive-products',
  templateUrl: './receive-products.component.html',
  styleUrls: ['./receive-products.component.css']
})
export class ReceiveProductsComponent implements OnInit {
  productsForApproval: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProductsForApproval();
  }
  

  loadProductsForApproval() {
    this.productService.getProductsForApproval().subscribe(data => {
      this.productsForApproval = data;
    });
  }

  approveProduct(productId: number) {
    this.productService.approveProduct(productId).subscribe(() => {
      // تحديث القائمة بعد الموافقة
      this.loadProductsForApproval();
      // يمكنك أيضًا إضافة الخطوات اللازمة لنقل المنتج إلى القائمة الرئيسية
    });
  }
  rejectProduct(productId: number) {
    // منطق رفض المنتج
    // هذا الكود يفترض أنه يتم التعامل مع المنتجات محليًا
    this.productsForApproval = this.productsForApproval.filter(product => product.id !== productId);

    // يمكنك هنا إضافة الكود للتعامل مع الخادم الخلفي إذا لزم الأمر
  }
}