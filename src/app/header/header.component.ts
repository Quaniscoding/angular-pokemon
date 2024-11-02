import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Cart } from '../../interface/cart';
import { CartService } from '../../services/cart.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CurrencyPipe, RouterModule, CommonModule, AlertComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn = false;
  cartList: Cart[] = [];
  itemCount: number = 0;
  itemSum: number = 0;
  isAnimating = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  isAlert: boolean = false;
  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}
  dataUser: { name: string; token: string } | null = null;
  title = 'Pokemon';
  getDataUser() {
    const userData = localStorage.getItem('User');
    if (userData) {
      this.dataUser = JSON.parse(userData);
    }
  }
  ngOnInit() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartList = cart;
      this.updateCartInfo();
    });
    this.getDataUser();
  }

  logout() {
    this.authService.logout();
  }

  Remove(index: number): void {
    this.cartService.RemoveCart(index);
    this.updateCartInfo();
  }

  DeleteAll(): void {
    this.cartService.DeleteAllCart();
    this.updateCartInfo();
  }

  updateCartInfo(): void {
    this.cartList = this.cartService.getCartAll();
    this.itemCount = this.cartService.ItemCount();
    this.itemSum = this.cartService.ItemSum();
  }

  Order(): void {
    if (this.cartList.length > 0) {
      const totalSum = this.itemSum;
      const totalCount = this.itemCount;
      this.cartService.DeleteAllCart();
      this.updateCartInfo();
      this.isAlert = true;
      this.showSuccessAlert(
        `Order placed successfully! Total: ${totalSum} for ${totalCount} items.`
      );
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
    } else {
      this.isAlert = true;
      this.showErrorAlert(
        'Your cart is empty. Please add some items before placing an order.'
      );
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
    }
  }

  triggerAnimation(): void {
    this.isAnimating = true;
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }
  increaseQuantity(item: any): void {
    item.quantity++;
    this.updateCartInfo();
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 0) {
      item.quantity--;
      this.updateCartInfo();
    }
  }
  private showSuccessAlert(message: string) {
    this.alertMessage = message;
    this.alertType = 'success';
    this.isAlert = true;
  }

  private showErrorAlert(message: string) {
    this.alertMessage = message;
    this.alertType = 'error';
    this.isAlert = true;
  }
}
