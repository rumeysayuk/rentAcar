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
  removeIcon = faExclamation;
  priceIcon = faLiraSign;
  cartItem:CartItem;
  rentDate=new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  returndate=new NgbDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()+1);
  totalPrice: number = 0;
  minReturnDate=new NgbDate(this.rentDate.year,this.rentDate.month,this.rentDate.day + 2);

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
      carId: this.cartItems[0].car.id,
      customerId: 1,
      id: null,
      rentDate:new Date(this.rentDate.year, this.rentDate.month, this.rentDate.day),
      returnDate: new Date(this.returndate.year, this.returndate.month, this.returndate.day)
    };
    this.router.navigate(['/payment/', JSON.stringify(myRental)]);
    this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...', 'Ödeme İşlemleri');
  }

  removeFromCart(car: Car) {
    this.cartService.removeFromCart(car);
    this.toastrService.error(car.brandName + ' sepetten silindi .');
  }
  calculatePrice(){
    var rentDate = new Date(this.rentDate.year, this.rentDate.month - 1, this.rentDate.day);
    var returnDate = new Date(this.returndate.year, this.returndate.month - 1, this.returndate.day);
    var timeDifference = Math.abs(returnDate.getTime() - rentDate.getTime());
    var dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    this.totalPrice = dayDifference * this.cartItems[0].car.dailyPrice;
  }
checkRent(){
    if(this.returndate!= this.rentDate){

    }
    else{
      this.toastrService.error('Araç kirada ...');
    }
}
}
