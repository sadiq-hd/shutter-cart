import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-secondary',
  templateUrl: './navbar-secondary.component.html',
  styleUrls: ['./navbar-secondary.component.css']
})
export class NavbarSecondaryComponent {
  dropdowns: { [key: string]: boolean } = {
    cameras: false,
    lenses: false,
    accessories: false,
    studioEquipment: false
  };

  constructor(private router: Router) { }

  toggleDropdown(dropdown: string) {
    this.dropdowns[dropdown] = !this.dropdowns[dropdown];
    for (const key in this.dropdowns) {
      if (key !== dropdown) {
        this.dropdowns[key] = false;
      }
    }
  }

  navigateTo(category: string) {
    this.router.navigate(['/products'], { queryParams: { category: category } });
    for (const key in this.dropdowns) {
      this.dropdowns[key] = false;
    }
  }
}
