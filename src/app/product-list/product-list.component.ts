import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  sortedProducts: any[] = [];
  sortMethod: string = 'name'; // افتراضي حسب اسم المنتج

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: Object) => { // تغيير النوع إلى Object
        this.products = data as any[]; // تحويل البيانات إلى مصفوفة من الـ any[]
      },
      (error) => {
        this.toastr.error('حدث خطأ أثناء جلب قائمة المنتجات.');
      }
    );
  }
  onEditProduct(product: any) {
    // تحديث المنتج
    this.productService.updateProduct(product.id, product).subscribe(
      () => {
        this.toastr.success('تم تحديث المنتج بنجاح');
        this.loadProducts();
      },
      (error) => {
        this.toastr.error('حدث خطأ أثناء تحديث المنتج.');
      }
    );
  }

  onChangeImage(product: any) {
    // قم بتنفيذ تغيير الصورة هنا
  }

  onDeleteProduct(product: any) {
    if (confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج؟')) {
      // قم بحذف المنتج
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          this.toastr.success('تم حذف المنتج بنجاح');
          this.loadProducts();
        },
        (error) => {
          this.toastr.error('حدث خطأ أثناء حذف المنتج.');
        }
      );
    }
  }
}