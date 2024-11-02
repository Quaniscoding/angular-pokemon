import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../alert/alert.component';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AlertComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
})
export class CustomerLoginComponent implements OnInit {
  isSignUp = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  isAlert: boolean = false;
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  id: number = 0;
  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.getAllUserList().subscribe((res) => {});
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;
  }

  onSubmit(form: NgForm) {
    if (this.isSignUp) {
      this.authService.Register(form).subscribe({
        next: (res) => {
          this.isAlert = true;
          this.showSuccessAlert(res);
          setTimeout(() => {
            this.isAlert = false;
          }, 3000);
          this.toggleSignUp();
        },
        error: (err) => {
          this.isAlert = true;
          this.showErrorAlert(err);
        },
      });
    } else {
      this.authService.loginCustomer(form).subscribe((res) => {
        if (res) {
          this.isAlert = true;
          this.showSuccessAlert('Login success!');
          setTimeout(() => {
            this.isAlert = false;
            this.router.navigate(['']);
          }, 3000);
        } else {
          this.showErrorAlert('Incorrect email or password. Please try again.');
        }
      });
    }
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
