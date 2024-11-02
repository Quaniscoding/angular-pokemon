import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseURL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {
    this.getAllProductList().subscribe((res) => {
      this.productsList = res;
    });
  }
  protected productsList: Product[] = [];
  getAllProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseURL}`);
  }
  getProductId(id: any) {
    return this.http.get<Product>(`${this.baseURL}/${id}`);
  }
  AutoId() {
    let max = 0;
    this.productsList.forEach((item) => {
      if (Number(item.id) > max) {
        max = Number(item.id);
      }
    });
    return max + 1;
  }
  AddProduct(formProduct: any): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.baseURL}`, formProduct);
  }
  EditProduct(id: number) {
    return this.productsList[id];
  }
  UpdateProduct(id: any, formProduct: any): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.baseURL}/${id}`, formProduct);
  }
  DeleteProduct(id: any): Observable<Product[]> {
    return this.http.delete<Product[]>(`${this.baseURL}/${id}`);
  }
}
