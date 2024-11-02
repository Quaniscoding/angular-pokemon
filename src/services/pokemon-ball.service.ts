import { Injectable } from '@angular/core';
import { PokemonBall } from '../interface/pokemon-ball';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonBallService {
  private baseURL = 'http://localhost:3000/pokemon';

  constructor(private http: HttpClient) {
    this.getAllPokemonBallList().subscribe((res) => {
      this.pokemonBallList = res;
    });
  }

  protected pokemonBallList: PokemonBall[] = [];
  getAllPokemonBallList(): Observable<PokemonBall[]> {
    return this.http.get<PokemonBall[]>(`${this.baseURL}`);
  }
  getPokemonBallById(id: any) {
    return this.http.get<PokemonBall>(`${this.baseURL}/${id}`);
  }
  AutoId() {
    let max = 0;
    this.pokemonBallList.forEach((item) => {
      if (Number(item.id) > max) {
        max = Number(item.id);
      }
    });
    return max + 1;
  }

  AddPokemon(formPokemon: any): Observable<PokemonBall[]> {
    return this.http.post<PokemonBall[]>(`${this.baseURL}`, formPokemon);
  }

  EditPokemon(id: any) {
    return this.pokemonBallList[id];
  }

  UpdatePokemon(id: any, formPokemon: any): Observable<PokemonBall[]> {
    return this.http.put<PokemonBall[]>(`${this.baseURL}/${id}`, formPokemon);
  }

  DeletePokemon(id: any): Observable<PokemonBall[]> {
    return this.http.delete<PokemonBall[]>(`${this.baseURL}/${id}`);
  }
}
