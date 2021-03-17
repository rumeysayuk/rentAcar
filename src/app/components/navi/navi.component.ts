import { Component, OnInit } from '@angular/core';
import {faGithub, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor() { }
  githubIcon = faGithub;
  instagramIcon = faInstagram;
  userIcon = faUser;
  ngOnInit(): void {
  }

}
