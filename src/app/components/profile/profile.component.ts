import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {Users} from '../../models/users';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userUpdateForm: FormGroup;
  id: number;
  user: Users;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.getUsersById(parseInt(localStorage.getItem('id'))).subscribe(response => {
      this.user = response.data;
      this.createUserUpdateForm();
    });
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: [this.user.id],
      email: [this.user.email, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      status: [this.user.status],
      password: ['', Validators.required]
    });
  }

  updateUser() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      this.authService.update(userModel, userModel.password).subscribe(response => {
        this.toastrService.success(response.message);
      });
    }
  }
}
