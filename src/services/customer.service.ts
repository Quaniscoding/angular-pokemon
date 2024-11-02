import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private router: Router, private http: HttpClient) {
    this.getAllUserList().subscribe((res) => {
      this.userList = res;
    });
  }

  protected userList: User[] = [];
  private URL = 'http://localhost:3000/users';

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

  Register(newUser: any): Observable<User> {
    return this.http.post<User>(this.URL, newUser);
  }
}
