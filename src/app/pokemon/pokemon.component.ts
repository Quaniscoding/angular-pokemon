import { Component } from '@angular/core';
import { Product } from '../../interface/products';
import { ProductsService } from '../../services/products.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent {
  searching: string = '';
  productDetail: Product | undefined;
  sortOption: string = 'nameAsc';
  filterProductList: Product[] = [];
  products: Product[] = [];
  isGridView: boolean = true;

  toggleLayout(): void {
    this.isGridView = !this.isGridView;
  }
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
  getPokemonTypes(product: Product): string[] {
    return Object.values(product.type);
  }
  getPokemonLocal(product: Product): string[] {
    return Object.values(product.local);
  }
  getPokemonEggGroup(product: Product): string[] {
    return Object.values(product.eggGroup);
  }
}
