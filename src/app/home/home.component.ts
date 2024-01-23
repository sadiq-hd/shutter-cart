import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { TranslateService } from '@ngx-translate/core';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { SearchServiceService } from '../service/search-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  searchKeyword: string = '';
  searchResults: any[] = [];
  searchCompleted: boolean = false;
  searchInProgress: boolean = false;
  currencySettings = {
    symbol: 'ر.س.',
  };
  router: any;
  isAdmin: boolean = false;


  constructor(
    private productService: ProductService,
    private translate: TranslateService,
    private shoppingCartService: ShoppingCartService,
    private searchServiceService: SearchServiceService // حقن خدمة البحث هنا

  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  private fetchProducts() {
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  navigateToPage(page: string) {
    this.clearSearchResults();
    this.router.navigate([page]);
  }
  
  clearSearchResults() {
    this.searchResults = [];
    this.searchKeyword = '';
    this.searchCompleted = false;
    this.searchInProgress = false;
  }
  ngOnDestroy() {
    this.clearSearchResults();
  }
  
  search() {
    if (this.searchKeyword) {
      this.productService.searchProducts(this.searchKeyword).subscribe((results: any[]) => {
        this.searchResults = results;
        this.searchCompleted = true;
         this.searchServiceService.sendSearchKeywordToServer(this.searchKeyword);

        // تحديث سجل البحث
        this.updateSearchHistory(this.searchKeyword);
      });
    }
  }
  private updateSearchHistory(keyword: string) {
    
  }
  
  // دالة لإضافة المنتج إلى العربة
  addToCart(product: any) {
    this.shoppingCartService.addToCart(product);
  }
}

