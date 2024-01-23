// productService.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiurl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addProduct(product: any) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiurl}/products`, product, { headers });
  }
  
  addProductForApproval(product: any) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiurl}/products-for-approval`, product, { headers })
      .pipe(retry(3)); // Retry the request up to 3 times
  }
  
  getProductsForApproval() {
    return this.http.get<any[]>(`${this.apiurl}/products-for-approval`);
  }
  
  

  approveProduct(productId: number) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiurl}/admin/approve-product`, { productId }, { headers });
  }

  rejectProduct(productId: number) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(`${this.apiurl}/admin/reject-product`, { productId }, { headers });
  }

  getProducts() {
    return this.http.get<any[]>(`${this.apiurl}/products`);
  }
  

  getProductDetails(id: number) {
    return this.http.get(`${this.apiurl}/products/${id}`);
  }

  updateProduct(id: number, updatedProduct: any) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put(`${this.apiurl}/products/${id}`, updatedProduct, { headers });
  }

  deleteProduct(productId: number) {
    const url = `${this.apiurl}/products/${productId}`;
    return this.http.delete(url);
  }

  uploadImage(imageData: FormData) {
    return this.http.post(`${this.apiurl}/upload-image`, imageData);
  }

  getBestSellingProducts() {
    return this.http.get<any[]>(`${this.apiurl}/admin/best-selling-products`);
  }

  getTotalRevenue() {
    return this.http.get<number>(`${this.apiurl}/admin/total-revenue`);
  }

  getActiveUsersCount() {
    return this.http.get<number>(`${this.apiurl}/admin/active-users-count`);
  }

  getInactiveUsersCount() {
    return this.http.get<number>(`${this.apiurl}/admin/inactive-users-count`);
}


searchProducts(keyword: string) {
  const timestamp = new Date().getTime(); // معرف الوقت الحالي
  return this.http.get<any[]>(`${this.apiurl}/products?search=${keyword}&timestamp=${timestamp}`)
    .pipe(
      map((products: any[]) => {
        return products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
      })
    );
}
}