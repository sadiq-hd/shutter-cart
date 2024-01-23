import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initForm();
    this.productForm.valueChanges.subscribe(value => {
      console.log("Form changes:", value);
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      image: [null],
      category: ['', Validators.required]  // خاصية جديدة لنوع المنتج
    });
  }

  selectedImages: any[] = [];

  onImageSelected(event: Event) {
    this.selectedImages = [];  // مسح الصور القديمة
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImages.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = {
        name: this.productForm.get('name')!.value,
        description: this.productForm.get('description')!.value,
        price: this.productForm.get('price')!.value,
        stock: this.productForm.get('stock')!.value,
        image: this.selectedImages[0] || "image_default.png", // إذا كان هناك صور محددة
        category: this.productForm.get('category')!.value  // خاصية جديدة لنوع المنتج
      };

      this.productService.addProduct(productData).subscribe(response => {
        this.toastr.success('Product added successfully');
      }, error => {
        this.toastr.warning('Error during adding product.');
      });
    } else {
      this.toastr.warning('Please fill in all required fields.');
    }
  }
}