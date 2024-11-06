import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {
    this.getAllUserList().subscribe((res) => {
      this.userList = res;
    });
  }

  isAuthenticated: boolean = false;
  private URL = 'http://localhost:3000/users';
  protected userList: User[] = [];
  getAllUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}`);
  }
  AutoId() {
    let max = 0;
    this.userList.forEach((item) => {
      if (Number(item.id) > max) {
        max = Number(item.id);
      }
    });
    return max + 1;
  }
  loginAdmin(form: any) {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    return this.getAllUserList().pipe(
      map((users: User[]) =>
        users.find(
          (user) =>
            user.email === email &&
            user.password === password &&
            user.role === 'Admin'
        )
      ),
      map((customer) => {
        if (customer) {
          localStorage.setItem(
            'User',
            JSON.stringify({
              name: customer.username,
              role: customer.role,
              token: 'token',
            })
          );
          this.isAuthenticated = true;
          return true;
        } else {
          this.isAuthenticated = false;
          return false;
        }
      })
    );
  }

  loginCustomer(form: any) {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    return this.getAllUserList().pipe(
      map((users: User[]) =>
        users.find((user) => user.email === email && user.password === password)
      ),
      switchMap((customer) => {
        if (customer) {
          this.isAuthenticated = true;
          localStorage.setItem(
            'User',
            JSON.stringify({
              name: customer.username,
              role: customer.role,
              token: 'token',
            })
          );
          return [true];
        } else {
          this.isAuthenticated = false;
          return [false];
        }
      })
    );
  }

  Register(form: any) {
    const email = form.controls['email'].value;
    const password = form.controls['password'].value;
    const confirmPassword = form.controls['confirmPassword'].value;

    if (password !== confirmPassword) {
      return throwError(new Error('Passwords do not match'));
    }

    return this.getAllUserList().pipe(
      map((users: User[]) => {
        this.userList = users;
        return users.find((user) => user.email === email);
      }),
      switchMap((existingUser) => {
        if (!existingUser) {
          const newUser = {
            id: this.AutoId().toString(),
            email: email,
            password: password,
            username: form.controls['username'].value,
            role: 'User',
          };
          return this.http.post<User>(this.URL, newUser).pipe(
            map((user) => {
              this.isAuthenticated = true;
              return 'Register success!';
            })
          );
        } else {
          return throwError(new Error('Email already in use'));
        }
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['admin']);
    localStorage.removeItem('User');
    this.router.navigate(['']);
  }
}
