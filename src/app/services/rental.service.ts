import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {Rental} from '../models/rental';
import {environment} from '../../environments/environment';
import {ResponseModel} from '../models/responseModel';
import {CreditCard} from "../models/creditCard";

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = environment.apiUrl + 'rentals/';

  constructor(private httpClient: HttpClient) {
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl + 'details');
  }

  getRentalByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+ 'detailsbycar?id='+carId);
  }

  addRental(rental: Rental,creditCard:CreditCard): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add',
      {
          'carId': rental.carId,
          'customerId': rental.customerId,
          'rentDate': rental.rentDate,
          'returnDate': rental.returnDate,
          'CardHolderName' :creditCard.CardHolderName,
          'ExpirationMonth' :creditCard.ExpirationMonth,
          'ExpirationYear':creditCard.ExpirationYear,
          'CardNumber':creditCard.CardNumber,
          'Cvv':creditCard.Cvv
    });
  }
}
