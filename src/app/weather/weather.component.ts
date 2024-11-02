import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-weather',
  template: `
    <div class="weather-info" *ngIf="weatherData">
      <h1>{{ weatherData.name }}, VN</h1>
      <div class="temp">
        <h2>{{ weatherData.main.temp }}°C</h2>
        <p>
          Feels like {{ weatherData.main.feels_like }}°C.
          {{ weatherData.weather[0].description | titlecase }}
        </p>
      </div>
      <div class="details">
        <p>💧 Rain: {{ weatherData.rain?.['1h'] || 0 }}mm</p>
        <p>
          🌬️ Wind: {{ weatherData.wind.speed }} m/s, {{ weatherData.wind.deg }}°
        </p>
        <p>🌡️ Pressure: {{ weatherData.main.pressure }} hPa</p>
        <p>💦 Humidity: {{ weatherData.main.humidity }}%</p>
        <p>👁️ Visibility: {{ weatherData.visibility / 1000 }} km</p>
      </div>
    </div>
  `,
  styles: [
    `
      .weather-info {
        background-color: #f8f9fa;
        border-radius: 5px;
        padding: 20px;
        margin-top: 20px;
        font-family: Arial, sans-serif;
        color: #333;
      }
      .temp h2 {
        font-size: 2em;
        color: #333;
      }
      .details p {
        margin: 5px 0;
        color: #666;
      }
    `,
  ],
})
export class WeatherComponent implements OnInit {
  weatherData: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    const apiKey = 'e01786b2a518e2f6777cb75fed151580';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Ho%20Chi%20Minh&units=metric&appid=${apiKey}`;

    this.http.get(url).subscribe({
      next: (data) => {
        this.weatherData = data;
      },
      error: (error) => {
        console.error('There was an error fetching the weather data!', error);
      },
    });
  }
}
