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
    const { email, password, username, confirmPassword } = this;
    if (this.isSignUp) {
      if (!email || !password || !username || !confirmPassword) {
        this.triggerAlert('Please enter full information!');
        return;
      }
      this.authService.Register(form).subscribe({
        next: (res) => this.handleResponse(res, 'Sign Up successful!'),
        error: (err) => this.triggerAlert(err),
      });
    } else {
      this.authService.loginCustomer(form).subscribe((res) => {
        res
          ? this.handleResponse('Login success!', '', true)
          : this.triggerAlert('Incorrect email or password. Please try again.');
      });
    }
  }

  triggerAlert(message: string) {
    this.isAlert = true;
    this.showErrorAlert(message);
    setTimeout(() => (this.isAlert = false), 3000);
  }

  handleResponse(message: string, alertMsg = '', navigateAfter = false) {
    this.isAlert = true;
    this.showSuccessAlert(message || alertMsg);
    setTimeout(() => {
      this.isAlert = false;
      if (navigateAfter) this.router.navigate(['']);
      else this.toggleSignUp();
    }, 3000);
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
