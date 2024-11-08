import { Component } from '@angular/core';
import { Product } from '../../interface/products';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductsService } from '../../services/products.service';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { PokemonComponent } from '../pokemon/pokemon.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ProductListComponent,
    RouterModule,
    HeaderComponent,
    CommonModule,
    CarouselComponent,
    PokemonComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  filterProductList: Product[] = [];
  products: Product[] = [];
  searching: string = '';
  sortOption: string = 'nameAsc';
  constructor(private productsService: ProductsService) {
    this.productsService.getAllProductList().subscribe((res) => {
      this.products = res;
      this.filterProductList = [...this.products];
    });
  }
  filterResults() {
    let filtered = this.products;
    if (this.searching) {
      filtered = filtered.filter((list) =>
        list.name.toLowerCase().includes(this.searching.toLowerCase())
      );
    }
    switch (this.sortOption) {
      case 'nameAsc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    this.filterProductList = filtered;
  }
}
