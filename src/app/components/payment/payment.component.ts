import {Component, OnInit} from '@angular/core';
import {faCcMastercard} from '@fortawesome/free-brands-svg-icons';
import {faAddressCard, faCity, faEnvelope, faRoad, faUser} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {Rental} from '../../models/rental';
import {RentalService} from '../../services/rental.service';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['myrental']) {
        this.rental = JSON.parse(params['myrental']);
      }
    });
    this.createCreditCardForm();
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

  addRental() {
    let cardModel = Object.assign({}, this.creditCardForm.value);
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
