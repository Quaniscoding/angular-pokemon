import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  formUser = new FormGroup({
    id: new FormControl<string>(''),
    username: new FormControl<string>(''),
    email: new FormControl<string>(''),
    password: new FormControl<string>(''),
    role: new FormControl<string>('User'),
  });
  IsAdd: number = 1;
  IsUpdate: number = 0;
  @Input() userList: User[] = [];
  constructor(private user: UserService) {}
  ngOnInit(): void {
    this.user.getAllUserList().subscribe((res) => {
      this.userList = res;
    });
  }
  Add() {
    this.formUser.controls.id.setValue(this.user.AutoId().toString());
    this.user.AddUser(this.formUser.value).subscribe((res) => {
      this.ngOnInit();
    });
  }
  Edit(id: number) {
    this.user.getUserId(id).subscribe((res) => {
      this.formUser.setValue(res);
    });
  }
  Update() {
    this.user
      .UpdateUser(this.formUser.controls['id'].value, this.formUser.value)
      .subscribe((res) => {
        this.ngOnInit();
      });
    setTimeout(() => {
      this.formUser.reset({
        id: '',
        username: '',
        email: '',
        password: '',
        role: 'User',
      });
    }, 0);
  }
  Delete(id: number) {
    this.user.DeleteUser(id).subscribe((res) => {
      this.ngOnInit();
    });
  }
  Reset() {
    this.IsAdd = 0;
    this.IsUpdate = 0;
    this.formUser.reset({
      id: '',
      username: '',
      email: '',
      password: '',
      role: 'User',
    });
  }
}
