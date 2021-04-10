import {Component, OnInit} from '@angular/core';
import {faCcMastercard} from '@fortawesome/free-brands-svg-icons';
import {faAddressCard, faCity, faEnvelope, faRoad, faUser} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {Rental} from '../../models/rental';
import {RentalService} from '../../services/rental.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {LocalStorageService} from "../../services/local-storage.service";

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
  cardHolderName:string;
  cardNumber:number;
  expirationMonth:Date;
  expirationYear:Date;
  cvv:number;

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              private router: Router,
              private localStorage:LocalStorageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['myrental']) {
        this.rental = JSON.parse(params['myrental']);
      }
    });
    this.createCreditCardForm();
    this.getRental();
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }
  getRental(){
var cardholdername= this.localStorage.getItem("cardholdername");
var cardnumber=this.localStorage.getItem("cardnumber");
var expirationMonth=this.localStorage.getItem("expirationmonth");
var expirationYear=this.localStorage.getItem("expirationYear");
var cvv=this.localStorage.getItem("cvv");
console.log(cardnumber+ cvv)

  }

  checked():boolean{
    if()
  }
  addRental() {
      document.getElementById("saveCreditCard")
      let cardModel = Object.assign({}, this.creditCardForm.value);
      this.rentalService.addRental(this.rental, cardModel).subscribe(response => {
      this.localStorage.setItem("cardholdername",cardModel.cardHolderName);
      this.localStorage.setItem("cardnumber",cardModel.cardNumber);
      this.localStorage.setItem("expirationmonth",cardModel.expirationMonth);
      this.localStorage.setItem("expirationYear",cardModel.expirationYear);
      this.localStorage.setItem("cvv",cardModel.cvv);
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
