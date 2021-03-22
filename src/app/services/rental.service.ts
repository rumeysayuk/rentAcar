import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {Rental} from '../models/rental';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = environment.apiUrl+'rentals/getallrentals';

  constructor(private httpClient: HttpClient) {
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    return  this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }
}