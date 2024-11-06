import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartList: Cart[] = [];

  private cartSubject = new BehaviorSubject<Cart[]>(this.cartList);

  cart$ = this.cartSubject.asObservable();

  constructor() {}

  getCartAll() {
    return this.cartList;
  }

  addCart(frmProduct: any, quantity: number) {
    const product = this.getCartAll().find((item) => item.id === frmProduct.id);
    if (product) {
      product.quantity += quantity;
    } else {
      this.cartList.push({
        id: frmProduct.id,
        name: frmProduct.name,
        price: frmProduct.price,
        quantity: quantity,
        img: frmProduct.img,
      });
    }
    this.cartSubject.next(this.cartList);
  }

  RemoveCart(index: number) {
    if (index >= 0 && index < this.cartList.length) {
      this.cartList.splice(index, 1);
      this.cartSubject.next(this.cartList);
    }
  }

  DeleteAllCart() {
    this.cartSubject.next([]);
    this.cartList = [];
  }

  ItemCount() {
    return this.cartList.reduce((total, item) => total + item.quantity, 0);
  }

  ItemSum() {
    return this.cartList.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
}
