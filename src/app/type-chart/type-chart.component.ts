import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-type-chart',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './type-chart.component.html',
  styleUrl: './type-chart.component.css',
})
export class TypeChartComponent {}
