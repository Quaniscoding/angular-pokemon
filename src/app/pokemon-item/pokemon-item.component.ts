import { Component, Input } from '@angular/core';
import { PokemonBall } from '../../interface/pokemon-ball';
import { PokemonBallService } from '../../services/pokemon-item.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-pokemon-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.css',
})
export class PokemonItemComponent {
  formPokemonItem = new FormGroup({
    id: new FormControl<string>('', Validators.required),
    name: new FormControl<string>('', Validators.required),
    price: new FormControl<number>(0, Validators.required),
    stock: new FormControl<number>(0, Validators.required),
    img: new FormControl<string>('', Validators.required),
    category: new FormControl<string>('', Validators.required),
    effect: new FormControl<string>('', Validators.required),
  });
  IsAdd: number = 1;
  IsUpdate: number = 0;
  idTodelete: number = 0;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  isAlert: boolean = false;
  @Input() productList: PokemonBall[] = [];
  constructor(private item: PokemonBallService) {}
  ngOnInit(): void {
    this.item.getAllPokemonBallList().subscribe((res) => {
      this.productList = res;
    });
  }
  Add() {
    if (this.formPokemonItem.valid) {
      this.formPokemonItem.controls.id.setValue(this.item.AutoId().toString());
      this.item.AddPokemon(this.formPokemonItem.value).subscribe((res) => {
        if (res === false) {
          this.isAlert = true;
          this.showErrorAlert('Pokemon item already exists!');
          setTimeout(() => {
            this.isAlert = false;
          }, 3000);
          return;
        }
        this.isAlert = true;
        this.showSuccessAlert('Add pokemon item success!');
        setTimeout(() => {
          this.isAlert = false;
        }, 3000);
        this.ngOnInit();
      });
    } else {
      this.isAlert = true;
      this.showErrorAlert('Please input all fields !');
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
    }
  }
  Edit(id: number) {
    this.item.getPokemonBallById(id).subscribe((res) => {
      this.formPokemonItem.setValue(res);
    });
  }
  Update() {
    if (this.formPokemonItem.valid) {
      this.item
        .UpdatePokemon(
          this.formPokemonItem.controls['id'].value,
          this.formPokemonItem.value
        )
        .subscribe((res) => {
          this.ngOnInit();
          this.isAlert = true;
          this.showSuccessAlert('Update pokemon item success!');
          setTimeout(() => {
            this.isAlert = false;
          }, 3000);
        });
    } else {
      this.isAlert = true;
      this.showErrorAlert('Please input all fields !');
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
    }
  }
  Delete() {
    this.item.DeletePokemon(this.idTodelete).subscribe((res) => {
      this.isAlert = true;
      this.showSuccessAlert('Delete pokemon item success!');
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
      this.ngOnInit();
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
