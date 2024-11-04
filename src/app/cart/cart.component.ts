import { Component, OnInit } from '@angular/core';
import { Product } from '../../interface/products';
import { PokemonBall } from '../../interface/pokemon-ball';
import { Cart } from '../../interface/cart';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { PokemonBallService } from '../../services/pokemon-ball.service';
import { CartService } from '../../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe,
    HeaderComponent,
    CommonModule,
    RouterModule,
    AlertComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private pokemonBallService: PokemonBallService,
    private cartService: CartService,
    private router: Router
  ) {}
  allProduct: (Product | PokemonBall)[] = [];
  productDetail: Product | PokemonBall | undefined;
  cartList: Cart[] = [];
  itemCount: number = 0;
  itemSum: number = 0;
  source: string | null = null;
  maxProductId: number = 0;
  dataUser: { name: string; token: string } | null = null;
  getDataUser() {
    const userData = localStorage.getItem('User');
    if (userData) {
      this.dataUser = JSON.parse(userData);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.source = params.get('source');
      this.loadProductDetail(id);
    });

    this.cartList = this.cartService.getCartAll();
    this.updateCartInfo();
    this.loadAllProducts();
    this.getDataUser();
  }

  private loadAllProducts(): void {
    if (this.source === 'product') {
      this.productService.getAllProductList().subscribe(
        (res) => {
          this.allProduct = res;
          this.maxProductId = this.allProduct.length;
        },
        (error) => {
          console.error('Failed to load products:', error);
        }
      );
    } else if (this.source === 'pokemonBall') {
      this.pokemonBallService.getAllPokemonBallList().subscribe(
        (res) => {
          this.allProduct = res;
          this.maxProductId = this.allProduct.length;
        },
        (error) => {
          console.error('Failed to load Pokemon balls:', error);
        }
      );
    }
  }

  private loadProductDetail(id: number): void {
    if (this.source === 'product') {
      this.productService.getProductId(id).subscribe(
        (res) => {
          this.productDetail = res;
        },
        (error) => {
          console.error('Failed to load product details:', error);
        }
      );
    } else if (this.source === 'pokemonBall') {
      this.pokemonBallService.getPokemonBallById(id).subscribe(
        (res) => {
          this.productDetail = res;
        },
        (error) => {
          console.error('Failed to load Pokemon ball details:', error);
        }
      );
    }
  }

  Add(): void {
    if (!this.dataUser) {
      this.router.navigate(['/Login']);
    } else {
      if (this.productDetail) {
        this.cartService.addCart(this.productDetail, 1);
        this.updateCartInfo();
        if ('stock' in this.productDetail) {
          this.productDetail.stock--;
        }
      }
    }
  }

  isProduct(
    productDetail: Product | PokemonBall | undefined
  ): productDetail is Product {
    return productDetail !== undefined && 'type' in productDetail;
  }

  updateCartInfo(): void {
    this.itemCount = this.cartService.ItemCount();
    this.itemSum = this.cartService.ItemSum();
  }

  getPokemonTypes(product: Product | PokemonBall | undefined): string[] {
    return product && 'type' in product
      ? product.type.split(',').map((type) => type.trim().toLowerCase())
      : [];
  }
}
