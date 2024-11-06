import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interface/products';
import { ProductsService } from '../../services/products.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    CommonModule,
    AlertComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  formProduct = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', Validators.required),
    productCode: new FormControl<string>('', Validators.required),
    releaseDate: new FormControl<string>('', Validators.required),
    price: new FormControl<number>(0, Validators.required),
    stock: new FormControl<number>(0, Validators.required),
    description: new FormControl<string>('', Validators.required),
    starRating: new FormControl<number>(5),
    img: new FormControl<string>('', Validators.required),
    rarity: new FormControl<string>('', Validators.required),
    type: new FormControl<string>('', Validators.required),
    HP: new FormControl<number>(0, Validators.required),
    Attack: new FormControl<number>(0, Validators.required),
    Defense: new FormControl<number>(0, Validators.required),
    Sp_Atk: new FormControl<number>(0, Validators.required),
    Sp_Def: new FormControl<number>(0, Validators.required),
    speed: new FormControl<number>(0, Validators.required),
    total: new FormControl<number>(0, Validators.required),
    species: new FormControl<string>('', Validators.required),
    height: new FormControl<number>(0, Validators.required),
    weight: new FormControl<number>(0, Validators.required),
    ablities: new FormControl<string>('', Validators.required),
    local: new FormControl<string>('', Validators.required),
    catchRate: new FormControl<string>('', Validators.required),
    baseFrendship: new FormControl<string>('', Validators.required),
    baseExp: new FormControl<number>(0, Validators.required),
    growthRate: new FormControl<string>('', Validators.required),
    eggGroup: new FormControl<string>('', Validators.required),
    gender: new FormControl<string>('', Validators.required),
    eggCycles: new FormControl<string>(''),
  });

  @Input() productList: Product[] = [];

  constructor(private productService: ProductsService) {}

  IsAdd: number = 1;
  IsUpdate: number = 0;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  isAlert: boolean = false;
  idTodelete: number = 0;
  ngOnInit(): void {
    this.productService.getAllProductList().subscribe((res) => {
      this.productList = res;
    });
  }

  Add() {
    if (this.formProduct.valid) {
      this.formProduct.controls.id.setValue(
        this.productService.AutoId().toString()
      );
      this.productService
        .AddProduct(this.formProduct.value)
        .subscribe((res) => {
          if (res === false) {
            this.isAlert = true;
            this.showErrorAlert('Pokemon already exists!');
            setTimeout(() => {
              this.isAlert = false;
            }, 3000);
            return;
          }
          this.isAlert = true;
          this.showSuccessAlert('Add pokemon success!');
          setTimeout(() => {
            this.isAlert = false;
          }, 3000);
          this.ngOnInit();
        });
      setTimeout(() => {
        this.formProduct.reset({
          id: '',
          name: '',
          productCode: '',
          releaseDate: '',
          price: 0,
          stock: 0,
          description: '',
          starRating: 0,
          img: '',
          rarity: '',
          type: '',
          HP: 0,
          Attack: 0,
          Defense: 0,
          Sp_Atk: 0,
          Sp_Def: 0,
          speed: 0,
          total: 0,
          species: '',
          height: 0,
          weight: 0,
          ablities: '',
          local: '',
          catchRate: '',
          baseFrendship: '',
          baseExp: 0,
          growthRate: '',
          eggGroup: '',
          gender: '',
          eggCycles: '',
        });
      }, 0);
    } else {
      this.isAlert = true;
      this.showErrorAlert('Please input all fields !');
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
    }
  }

  Edit(id: number) {
    this.productService.getProductId(id).subscribe((res) => {
      res.releaseDate = this.convertDateToInputFormat(res.releaseDate);
      this.formProduct.setValue(res);
    });
  }
  Update() {
    if (this.formProduct.valid) {
      this.productService
        .UpdateProduct(this.formProduct.controls['id'].value, {
          ...this.formProduct.value,
        })
        .subscribe((res) => {
          this.isAlert = true;
          this.showSuccessAlert('Update pokemon success!');
          setTimeout(() => {
            this.isAlert = false;
          }, 3000);
          this.ngOnInit();
        });
      setTimeout(() => {
        this.formProduct.reset({
          id: '',
          name: '',
          productCode: '',
          releaseDate: '',
          price: 0,
          stock: 0,
          description: '',
          starRating: 0,
          img: '',
          rarity: '',
          type: '',
          HP: 0,
          Attack: 0,
          Defense: 0,
          Sp_Atk: 0,
          Sp_Def: 0,
          speed: 0,
          total: 0,
          species: '',
          height: 0,
          weight: 0,
          ablities: '',
          local: '',
          catchRate: '',
          baseFrendship: '',
          baseExp: 0,
          growthRate: '',
          eggGroup: '',
          gender: '',
          eggCycles: '',
        });
      }, 0);
    } else {
      alert('Please input all field !');
    }
  }

  Delete() {
    this.productService.DeleteProduct(this.idTodelete).subscribe((res) => {
      this.isAlert = true;
      this.showSuccessAlert('Delete pokemon success!');
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
      this.ngOnInit();
    });
  }
  convertDateToInputFormat(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  Reset() {
    this.IsAdd = 0;
    this.IsUpdate = 0;
    this.formProduct.reset({
      id: '',
      name: '',
      productCode: '',
      releaseDate: '',
      price: 0,
      stock: 0,
      description: '',
      starRating: 0,
      img: '',
      rarity: '',
      type: '',
      HP: 0,
      Attack: 0,
      Defense: 0,
      Sp_Atk: 0,
      Sp_Def: 0,
      speed: 0,
      total: 0,
      species: '',
      height: 0,
      weight: 0,
      ablities: '',
      local: '',
      catchRate: '',
      baseFrendship: '',
      baseExp: 0,
      growthRate: '',
      eggGroup: '',
      gender: '',
      eggCycles: '',
    });
  }
  private showErrorAlert(message: string) {
    this.alertMessage = message;
    this.alertType = 'error';
    this.isAlert = true;
  }
  private showSuccessAlert(message: string) {
    this.alertMessage = message;
    this.alertType = 'success';
    this.isAlert = true;
  }
}
