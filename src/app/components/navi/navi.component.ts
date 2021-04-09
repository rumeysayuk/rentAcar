import {Component, OnInit} from '@angular/core';
import {faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  githubIcon = faGithub;
  instagramIcon = faInstagram;
  userIcon = faUser;
  userName: string;

  constructor(private  toastrService: ToastrService,
              private authService: AuthService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userCheck();
    this.getUsersById();
  }

  userCheck() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  LogOut() {
    localStorage.clear();
    window.location.reload();
  }

  getUsersById() {
    if (parseInt(localStorage.getItem('id'))) {
      this.userService.getUsersById(parseInt(localStorage.getItem('id'))).subscribe(response => {
        this.userName = response.data.firstName + ' ' + response.data.lastName;
      });
    }
  }
}
