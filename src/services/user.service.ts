import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
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
  getUserId(id: number) {
    return this.http.get<User>(`${this.URL}/${id}`);
  }
  AddUser(newUser: any): Observable<any> {
    const isUserExist = this.userList.some(
      (user) => user.username === newUser.name
    );
    if (isUserExist) {
      return of(false);
    } else {
      return this.http.post<User[]>(this.URL, newUser).pipe(
        tap((newUserList) => {
          this.userList = newUserList;
        })
      );
    }
  }
  UpdateUser(id: any, frmUser: any): Observable<User[]> {
    return this.http.put<User[]>(`${this.URL}/${id}`, frmUser);
  }
  DeleteUser(id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${this.URL}/${id}`);
  }
}
