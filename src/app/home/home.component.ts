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
export class HomeComponent {}
