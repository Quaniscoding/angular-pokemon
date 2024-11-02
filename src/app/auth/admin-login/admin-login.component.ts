import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  constructor(private auth: AuthService, private router: Router) {}
  email: string = '';
  password: string = '';
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  isAlert: boolean = false;
  ngOnInit(): void {
    this.auth.getAllUserList().subscribe((res) => {});
  }
  onSubmit(form: NgForm) {
    this.auth.loginAdmin(form).subscribe({
      next: (res) => {
        if (res === true) {
          this.isAlert = true;
          this.showSuccessAlert('Login success!');
          setTimeout(() => {
            this.isAlert = false;
            this.router.navigate(['dashboard']);
          }, 3000);
        } else {
          this.showErrorAlert('Login failed. Please try again.');
        }
      },
    });
  }

  private showSuccessAlert(message: string) {
    this.alertMessage = message;
    this.alertType = 'success';
    this.isAlert = true;
  }

  private showErrorAlert(message: string) {
    this.alertMessage = message;
    this.alertType = 'error';
    this.isAlert = true;
  }
}
