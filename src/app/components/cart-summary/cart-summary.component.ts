import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../models/cartItem';
import {CartService} from '../../services/cart.service';
import {Car} from '../../models/car';
import {CarImage} from '../../models/car-image';
import {faExclamation, faLiraSign} from '@fortawesome/free-solid-svg-icons';
import {CarImageService} from '../../services/car-image.service';
import {CarService} from '../../services/car.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import {NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Rental} from '../../models/rental';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cartItems?: CartItem[];
  baseUrl = environment.baseUrl;
  carImages: CarImage[] = [];
  tlIcon = faLiraSign;
  now = new Date();
  model = new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  totalPrice: number = 0;
  removeIcon = faExclamation;
  priceIcon = faLiraSign;

  constructor(private cartService: CartService,
              private carImageService: CarImageService,
              private carService: CarService,
              private toastrService: ToastrService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartItems = this.cartService.list();
  }

  createRental() {
    let myRental: Rental = {
      returnDate: new Date(this.model.year, this.model.month, this.model.day),
      carId: this.cartItems[0].car.id,
      customerId: 2,
      id: null,
      rentDate: this.now
    };
    this.router.navigate(['/payment/', JSON.stringify(myRental)]);
    this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...', 'Ödeme İşlemleri');
  }

  removeFromCart(car: Car) {
    this.cartService.removeFromCart(car);
    this.toastrService.error(car.brandName + ' sepetten silindi .');
  }
}
