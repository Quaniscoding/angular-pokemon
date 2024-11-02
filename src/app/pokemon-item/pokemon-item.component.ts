import { Component, Input } from '@angular/core';
import { PokemonBall } from '../../interface/pokemon-ball';
import { PokemonBallService } from '../../services/pokemon-ball.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-pokemon-item',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.css',
})
export class PokemonItemComponent {
  formPokemonItem = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>(''),
    price: new FormControl<number>(0),
    stock: new FormControl<number>(0),
    img: new FormControl<string>(''),
    category: new FormControl<string>(''),
    effect: new FormControl<string>(''),
  });
  IsAdd: number = 1;
  IsUpdate: number = 0;
  @Input() productList: PokemonBall[] = [];
  constructor(private item: PokemonBallService) {}
  ngOnInit(): void {
    this.item.getAllPokemonBallList().subscribe((res) => {
      this.productList = res;
    });
  }
  Add() {
    this.formPokemonItem.controls.id.setValue(this.item.AutoId().toString());
    this.item.AddPokemon(this.formPokemonItem.value).subscribe((res) => {
      this.ngOnInit();
    });
  }
  Edit(id: number) {
    console.log(id);

    this.item.getPokemonBallById(id).subscribe((res) => {
      console.log(res);
      this.formPokemonItem.setValue(res);
    });
  }
  Update() {
    this.item
      .UpdatePokemon(
        this.formPokemonItem.controls['id'].value,
        this.formPokemonItem.value
      )
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
  Delete(id: number) {
    this.item.DeletePokemon(id).subscribe((res) => {
      this.ngOnInit();
    });
  }
}
