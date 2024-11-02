import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokemonBall } from '../../interface/pokemon-ball';
import { PokemonBallService } from '../../services/pokemon-ball.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-ball',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, RouterModule],
  templateUrl: './pokemon-ball.component.html',
  styleUrls: ['./pokemon-ball.component.css'],
})
export class PokemonBallComponent {
  filterPokemonBallList: PokemonBall[] = [];
  pokemon: PokemonBall[] = [];
  searching: string = '';
  selectedCategory: string = '';
  categories: string[] = ['All', 'Berries', 'Pokeballs'];
  sortDirection: 'asc' | 'desc' = 'asc';
  isSorted: boolean = false;
  sortField: 'name' | 'category' = 'name';

  constructor(private pokemonService: PokemonBallService) {
    this.pokemonService.getAllPokemonBallList().subscribe((res) => {
      this.pokemon = res;
      this.filterPokemonBallList = [...this.pokemon];
    });
  }

  filterResults() {
    let filtered = this.pokemon;
    if (this.searching) {
      filtered = filtered.filter((list) =>
        list.name.toLowerCase().includes(this.searching.toLowerCase())
      );
    }
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      filtered = filtered.filter(
        (list) => list.category === this.selectedCategory
      );
    }
    filtered.sort((a, b) => {
      if (this.sortField === 'name') {
        return this.sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (this.sortField === 'category') {
        return this.sortDirection === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
      return 0;
    });

    this.filterPokemonBallList = filtered;
  }

  toggleSort(field: 'name' | 'category') {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.isSorted = true;
    this.filterResults();
  }
}
