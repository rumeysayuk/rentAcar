import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CarImageService} from '../../../services/car-image.service';
import {CarImage} from '../../../models/car-image';
import {Car} from '../../../models/car';
import {environment} from '../../../../environments/environment';
import {CarService} from '../../../services/car.service';
import {faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import {CartService} from '../../../services/cart.service';
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  baseUrl = environment.baseUrl;
  cars: Car[] = [];
  carImages: CarImage[] = [];
  tlIcon = faLiraSign;

  dataLoaded = true;

  constructor(private carImageService: CarImageService,
              private carService: CarService,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private cartService: CartService) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.getDetailsById(params['carId']);

      }
    });
    document.addEventListener('DOMContentLoaded', function() {
      const el = document.querySelector('.button-bird');
      const text = document.querySelector('.button-bird__text');
      if (el != null) {
        el.addEventListener('click', function() {
          el.classList.toggle('active');

          if (el.classList.contains('active')) {
            if (text != null) {
              text.innerHTML = 'Sepete Eklendi';
            }
          } else {
            if (text != null) {
              text.innerHTML = 'Sepete Ekle';
            }
          }
        });
      }
    });
    console.log(this.cars);
  }

  goCart(car: Car) {

    this.toastrService.success(' Araç sepete eklendi.Yönlendiriliyorsunuz.');
    this.cartService.addToCart(car);
    setTimeout(this.timeout(),2000)
  }
  timeout():any{
    this.router.navigate(['/cartsummary'])
  }

  getDetailsById(carId: number) {
    this.carService.getCarDetailById(carId).subscribe(response => {
      this.cars = response.data;
      console.log(this.cars)
    });
    this.dataLoaded = true;
  }
}
