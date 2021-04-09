import {Component, OnInit} from '@angular/core';
import {faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private  toastrService: ToastrService,
              private authService: AuthService,
              private router: Router) {
  }

  githubIcon = faGithub;
  instagramIcon = faInstagram;
  userIcon = faUser;

  ngOnInit(): void {
  }

  userCheck() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
}
