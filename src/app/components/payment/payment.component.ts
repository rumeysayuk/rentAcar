import {Component, OnInit} from '@angular/core';
import {faCcMastercard} from '@fortawesome/free-brands-svg-icons';
import {faAddressCard, faCity, faEnvelope, faRoad, faUser} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {Rental} from '../../models/rental';
import {RentalService} from '../../services/rental.service';
import {ToastrService} from 'ngx-toastr';

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

  constructor(private activatedRoute: ActivatedRoute,
              private rentalService: RentalService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['myrental']) {
        this.rental = JSON.parse(params['myrental']);
      }
    });
  }

  addRental(rental: Rental) {
    this.rentalService.addRental(rental).subscribe(response => {
      this.toastrService.info(response.message);
    });
  }
}
