import {Component, OnInit} from '@angular/core';
import {faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Car} from "../../models/car";
import {Users} from "../../models/users";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  users: Users [] = [];
  dataLoaded = true;
  constructor(private  toastrService: ToastrService,
              private authService: AuthService,
              private router: Router,
              private userService:UserService) {
  }

  githubIcon = faGithub;
  instagramIcon = faInstagram;
  userIcon = faUser;

  ngOnInit(): void {
    this.userCheck();
    this.getUsers();
    console.log(this.users);
  }

  userCheck() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response.data
      console.log(response.data)
    });
    this.dataLoaded = true;

  }
  getUsersById(id:number) {
    this.userService.getUsersById(id).subscribe(response => {this.users = response.data});
    this.dataLoaded = true;
  }
}
