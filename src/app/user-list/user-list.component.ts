import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/user';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  formUser = new FormGroup({
    id: new FormControl<string>('', Validators.required),
    username: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    role: new FormControl<string>('User', Validators.required),
  });
  IsAdd: number = 1;
  IsUpdate: number = 0;
  idTodelete: number = 0;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  isAlert: boolean = false;
  @Input() userList: User[] = [];
  constructor(private user: UserService) {}
  ngOnInit(): void {
    this.user.getAllUserList().subscribe((res) => {
      this.userList = res;
    });
  }
  Add() {
    if (this.formUser.valid) {
      this.formUser.controls.id.setValue(this.user.AutoId().toString());
      this.user.AddUser(this.formUser.value).subscribe((res) => {
        if (res === false) {
          this.isAlert = true;
          this.showErrorAlert('User already exists !');
          setTimeout(() => {
            this.isAlert = false;
          }, 3000);
          return;
        }
        this.isAlert = true;
        this.showSuccessAlert('Add user success!');
        setTimeout(() => {
          this.isAlert = false;
        }, 3000);
        this.ngOnInit();
      });
    } else {
      this.isAlert = true;
      this.showErrorAlert('Please input all fields !');
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
    }
  }
  Edit(id: number) {
    this.user.getUserId(id).subscribe((res) => {
      this.formUser.setValue(res);
    });
  }
  Update() {
    if (this.formUser.valid) {
      this.user
        .UpdateUser(this.formUser.controls['id'].value, this.formUser.value)
        .subscribe((res) => {
          this.ngOnInit();
        });
      this.isAlert = true;
      this.showSuccessAlert('Update user success!');
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
      setTimeout(() => {
        this.formUser.reset({
          id: '',
          username: '',
          email: '',
          password: '',
          role: 'User',
        });
      }, 0);
    } else {
      this.isAlert = true;
      this.showErrorAlert('Please input all fields !');
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
    }
  }
  Delete() {
    this.user.DeleteUser(this.idTodelete).subscribe((res) => {
      this.ngOnInit();
      this.isAlert = true;
      this.showSuccessAlert('Delete user success!');
      setTimeout(() => {
        this.isAlert = false;
      }, 3000);
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
  private showErrorAlert(message: string) {
    this.alertMessage = message;
    this.alertType = 'error';
    this.isAlert = true;
  }
  private showSuccessAlert(message: string) {
    this.alertMessage = message;
    this.alertType = 'success';
    this.isAlert = true;
  }
}
