import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authService:AuthService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {


  }
  login() {
    if (this.registerForm.valid) {
      let loginModel = Object.assign({}, this.registerForm.value);
      this.authService.register(loginModel).subscribe(response => {
          localStorage.setItem('token', response.data.token);
          this.toastrService.info(response.message);
        }, error => {
          this.toastrService.error(error.error);
        }
      );
    }
  }
  createLoginForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
