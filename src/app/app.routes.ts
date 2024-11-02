import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { CustomerLoginComponent } from './auth/customer-login/customer-login.component';
import { authGuard } from './auth/auth.guard';
import { TypeChartComponent } from './type-chart/type-chart.component';
import { PokemonBallComponent } from './pokemon-ball/pokemon-ball.component';
import { PokemonItemComponent } from './pokemon-item/pokemon-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'cart/:id/:source', component: CartComponent, title: 'Detail' },
  { path: 'Login', component: CustomerLoginComponent, title: 'Login' },
  { path: 'admin', component: AdminLoginComponent, title: 'Login admin' },
  {
    path: 'pokemonBall',
    component: PokemonBallComponent,
    title: 'Pokemon ball',
  },
  {
    path: 'typeChart',
    component: TypeChartComponent,
    title: 'Pokémon types & type chart',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [authGuard],
    title: 'Dashboard',
    children: [
      {
        path: 'product',
        component: ProductListComponent,
        title: 'Product list',
      },
      {
        path: 'user',
        component: UserListComponent,
        title: 'User list',
      },
      {
        path: 'pokemonItem',
        component: PokemonItemComponent,
        title: 'Pokemon Item list',
      },
    ],
  },
];
