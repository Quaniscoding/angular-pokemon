interface PokemonType {
  electric?: string;
  fire?: string;
  water?: string;
  flying?: string;
  psychic?: string;
  normal?: string;
  fairy?: string;
  ghost?: string;
  poison?: string;
  fighting?: string;
  steel?: string;
  daragon?: string;
}
interface EggGroup {
  electric?: string;
  fire?: string;
  water?: string;
  flying?: string;
  psychic?: string;
  normal?: string;
  fairy?: string;
  ghost?: string;
  poison?: string;
  fighting?: string;
  steel?: string;
  daragon?: string;
  field?: string;
  monster?: string;
  undiscovered?: string;
  amorphous?: string;
  humanLike?: string;
}
export interface Product {
  id: string;
  name: string;
  productCode: string;
  releaseDate: string;
  price: number;
  stock: number;
  description: string;
  starRating: number;
  img: string;
  rarity: string;
  type: string;
  HP: number;
  Attack: number;
  Defense: number;
  Sp_Atk: number;
  Sp_Def: number;
  speed: number;
  total: number;
  species: string;
  height: number;
  weight: number;
  ablities: string;
  local: string;
  catchRate: string;
  baseFrendship: string;
  baseExp: number;
  growthRate: string;
  eggGroup: string;
  gender: string;
  eggCycles: string;
}
