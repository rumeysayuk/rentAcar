import {Component, OnInit} from '@angular/core';
import {faCcMastercard} from '@fortawesome/free-brands-svg-icons';
import {faAddressCard, faCity, faEnvelope, faRoad, faUser} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {Rental} from '../../models/rental';
import {RentalService} from '../../services/rental.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  userIcon = faUser;
  mailIcon = faEnvelope;
  addressIcon = faAddressCard;
  cityIcon = faCity;
  streetIcon = faRoad;
  masterCardIcon = faCcMastercard;
  rental: Rental;
  creditCardForm: FormGroup;
  cvv: string;
  cardNumber: string;
  expirationYear: number;
  expirationMonth: number;
  cardHolderName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              private router: Router,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['myrental']) {
        this.rental = JSON.parse(params['myrental']);
      }
    });
    this.createCreditCardForm();
    this.getSavedCard();
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardHolderName: [this.cardHolderName, Validators.required],
      cardNumber: [this.cardNumber, Validators.required],
      expirationMonth: [this.expirationMonth, Validators.required],
      expirationYear: [this.expirationYear, Validators.required],
      cvv: [this.cvv, Validators.required],
    });
  }

  getSavedCard() {
    var cardHolderName = this.localStorage.getItem('cardholdername');
    var cardNumber = this.localStorage.getItem('cardnumber');
    var expirationMonth = this.localStorage.getItem('expirationmonth');
    var expirationYear = this.localStorage.getItem('expirationYear');
    var cvv = this.localStorage.getItem('cvv');
    if (cardHolderName != null && cardNumber != null && expirationMonth != null && expirationYear != null && cvv != null) {
      this.cardHolderName = cardHolderName;
      this.cardNumber = cardNumber;
      this.cvv = cvv;
      this.expirationMonth = parseInt(expirationMonth);
      this.expirationYear = parseInt(expirationYear);
    }
  }

  addRental() {
    let cardModel = Object.assign({}, this.creditCardForm.value);
    let saveCreditCardInput = <HTMLInputElement> document.getElementById('saveCreditCard');
    if (saveCreditCardInput.checked == true) {
      this.localStorage.setItem('cardholdername', cardModel.cardHolderName);
      this.localStorage.setItem('cardnumber', cardModel.cardNumber);
      this.localStorage.setItem('expirationmonth', cardModel.expirationMonth);
      this.localStorage.setItem('expirationYear', cardModel.expirationYear);
      this.localStorage.setItem('cvv', cardModel.cvv);
    }
    this.rentalService.addRental(this.rental, cardModel).subscribe(response => {
      this.toastrService.info(response.message);
      this.router.navigate(['/']).then(() => setTimeout(function() {
        window.location.reload();
      }, 800));
    }, error => {
      if (error.error.Errors.length > 0) {
        for (let i = 0; i < error.error.Errors.length; i++) {
          this.toastrService.error(error.error.Errors[i].ErrorMessage);
        }
      }
    });
  }
}
