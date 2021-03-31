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
import {RentalService} from '../../services/rental.service';

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
  cartItem: CartItem;
  rentDate: NgbDate;
  returnDate: NgbDate;
  totalPrice: number;
  minReturnDate: NgbDate;
  minRentDate: NgbDate;
  carId: number;
  now = new Date();

  constructor(private cartService: CartService,
              private carImageService: CarImageService,
              private carService: CarService,
              private toastrService: ToastrService,
              private router: Router,
              private  rentalService: RentalService) {
  }

  ngOnInit(): void {
    this.getCart();
    if (this.carId != null) {
      this.rentalService.getRentalByCarId(this.carId).subscribe(response => {
        this.checkCarMinRentDateAndReturnDate(response);
      });
    }
  }

  checkCarMinRentDateAndReturnDate(response: any) {
    if (response.data.length != 0) {
      var fullDate = response.data[response.data.length - 1].returnDate.toString().split('-', 3);
      var year = parseInt(fullDate[0]);
      var month = parseInt(fullDate[1]);
      var day = parseInt(fullDate[2]);
      if (year > this.now.getFullYear()
        || year == this.now.getFullYear() && month > this.now.getMonth()
        || year == this.now.getFullYear() && month == this.now.getMonth()
        && day > this.now.getDate()) {
        this.minRentDate = new NgbDate(year, month, day + 1);
        this.minReturnDate = new NgbDate(year, month, day + 2);
      } else {
        this.minRentDate = new NgbDate(this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate());
        this.minReturnDate = new NgbDate(this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate());
      }
    } else {
      this.minRentDate = new NgbDate(this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate());
      this.minReturnDate = new NgbDate(this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate());
    }
    this.rentDate = this.minRentDate;
    this.returnDate = this.minReturnDate;
  }

  getCart() {
    if (this.cartService.list().length > 0) {
      this.cartItems = this.cartService.list();
      this.carId = this.cartItems[this.cartItems.length - 1].car.id;
      this.totalPrice = this.cartItems[this.cartItems.length - 1].car.dailyPrice;
    } else {
      this.router.navigate(['/']);
      this.toastrService.info('Sepetiniz Boş. Yönlendiriliyorsunuz...');
    }
  }

  checkRent() {
    return this.checkDateDifference() && this.checkDayDifference();
  }

  createRental() {
    if (this.checkRent()) {
      let myRental: Rental = {
        id: null,
        carId: this.cartItems[0].car.id,
        userId: 1,
        rentDate: new Date(this.rentDate.year, this.rentDate.month - 1, this.rentDate.day + 1),
        returnDate: new Date(this.returnDate.year, this.returnDate.month - 1, this.returnDate.day + 1)
      };
      this.router.navigate(['/payment/', JSON.stringify(myRental)]).then(() => window.location.reload());
      this.toastrService.info('Ödeme sayfasına yönlendiriliyorsunuz...', 'Ödeme İşlemleri');
    }
  }

  calculatePrice() {
    var rentDate = new Date(this.rentDate.year, this.rentDate.month, this.rentDate.day);
    var returnDate = new Date(this.returnDate.year, this.returnDate.month, this.returnDate.day);
    var timeDifference = Math.abs(returnDate.getTime() - rentDate.getTime());
    var dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    this.totalPrice = dayDifference * this.cartItems[0].car.dailyPrice;
  }

  checkDateDifference(): boolean {
    if (this.rentDate.year > this.returnDate.year
      || this.rentDate.year == this.returnDate.year && this.rentDate.month > this.returnDate.month
      || this.rentDate.year == this.returnDate.year && this.rentDate.month == this.returnDate.month
      && this.rentDate.day > this.returnDate.day) {
      this.toastrService.error('Alış Tarihiniz Teslim Tarihinden Büyük Olamaz');
      this.totalPrice = this.cartItems[0].car.dailyPrice;
      return false;
    }
    return true;
  }

  checkDayDifference(): boolean {
    if (this.rentDate.year == this.returnDate.year && this.rentDate.month == this.returnDate.month
      && this.rentDate.day == this.returnDate.day) {
      this.toastrService.error('Alış Tarihi ve Teslim Tarihi Eşit Olamaz');
      return false;
    }
    return true;
  }

  removeFromCart(car: Car) {
    this.cartService.removeFromCart(car);
    this.toastrService.error(car.brandName + ' sepetten silindi .');
  }
}
