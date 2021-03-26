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
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {
  cartItems?: CartItem[];
  baseUrl = environment.baseUrl;
  totalPrice: number = 0;
  removeIcon = faExclamation;
  priceIcon = faLiraSign;
  constructor(private cartService: CartService,
              private carImageService: CarImageService,
              private carService: CarService,
              private toastrService: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartItems = this.cartService.list();
    if(this.cartItems.length<1){
      this.router.navigate(["/"]);
      this.toastrService.info("Sepetiniz boş.")
    }

  }

  removeFromCart(car: Car) {
      this.cartService.removeFromCart(car);
      this.toastrService.error(car.brandName + ' sepetten silindi .');
      this.getCart();


  }
}
