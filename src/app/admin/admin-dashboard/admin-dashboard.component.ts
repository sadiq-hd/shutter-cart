import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeUsers: number = 0;
  inactiveUsers: number = 0;
  bestSellingProducts: any[] = [];
  totalRevenue: number = 0;

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsersData();
    this.loadProductsData();
  }

  loadUsersData(): void {
    this.productService.getActiveUsersCount().subscribe((activeCount: number) => {
      this.activeUsers = activeCount;
    });

    this.productService.getInactiveUsersCount().subscribe((inactiveCount: number) => {
      this.inactiveUsers = inactiveCount;
    });
  }

  loadProductsData(): void {
    // تأكد من تعريف هذه الدوال في ProductService
    this.productService.getBestSellingProducts().subscribe((products: any[]) => {
      this.bestSellingProducts = products;
    });

    this.productService.getTotalRevenue().subscribe((revenue: number) => {
      this.totalRevenue = revenue;
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // ... الدوال الأخرى ...
}
