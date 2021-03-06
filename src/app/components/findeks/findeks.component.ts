import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {CarService} from '../../services/car.service';
import {UserService} from '../../services/user.service';
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-findeks',
  templateUrl: './findeks.component.html',
  styleUrls: ['./findeks.component.css']
})
export class FindeksComponent implements OnInit {
  findeksForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private toastrService: ToastrService,
              private router: Router,
              private userService: UserService,
              private localStorage:LocalStorageService) {
  }

  ngOnInit(): void {
    this.createFindeksForm();

  }

  createFindeksForm() {
    this.findeksForm = this.formBuilder.group({
      tcNo: ['', Validators.required],
      dateOfYear: ['', Validators.required]
    });
  }

  findeksCalculate() {
    let findeksModel = Object.assign({}, this.findeksForm.value);
    this.userService.getUserFindeks(findeksModel).subscribe(response => {
      this.toastrService.success('Findeks Hesapland─▒');
      this.localStorage.setItem('findeks', response.data.findeksScore.toString());
      this.router.navigate(['/'])
        .then(() => setTimeout(function() {
          window.location.reload();
        }, 800));
    });

  }
}
