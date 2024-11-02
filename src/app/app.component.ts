import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    ProductListComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataUser: { name: string; token: string; role: string } | null = null;
  title = 'Pokemon';

  ngOnInit(): void {
    this.getDataUser();
  }

  getDataUser() {
    const userData = localStorage.getItem('User');
    if (userData) {
      this.dataUser = JSON.parse(userData);
    }
  }
}
