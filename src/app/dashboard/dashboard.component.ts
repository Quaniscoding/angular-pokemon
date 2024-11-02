import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, WeatherComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dataUser: { name: string; token: string } | null = null;

  constructor(private authService: AuthService) {}
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  ngOnInit() {
    this.getDataUser();
  }

  logout() {
    this.authService.logout();
  }

  getDataUser() {
    const userData = localStorage.getItem('User');
    if (userData) {
      this.dataUser = JSON.parse(userData);
    }
  }
}
