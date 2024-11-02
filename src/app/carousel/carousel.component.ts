import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  pokemonList = [
    {
      name: 'Pikachu',
      imageUrl: './assets/images/pikachu.jpg',
      details: 'Electric-type Pokémon known for its lightning abilities.',
    },
    {
      name: 'Charizard',
      imageUrl: './assets/images/Charizard.webp',
      details: 'Fire and flying-type Pokémon with powerful flame attacks.',
    },
    {
      name: 'Bulbasaur',
      imageUrl: './assets/images/Ash_Bulbasaur.webp',
      details: 'Grass-type Pokémon known for its seed attacks.',
    },
  ];
}
