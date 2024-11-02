// alert.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class AlertComponent {
  @Input() message: string = ''; // Message to display
  @Input() type: 'success' | 'error' = 'success'; // Type of alert (success or error)
  @Input() isVisible: boolean = false; // Control alert visibility
  @Output() close = new EventEmitter<void>(); // Emit event on close

  // Method to handle closing the alert
  closeAlert(): void {
    this.isVisible = false;
    this.close.emit(); // Emit the close event
  }
}
