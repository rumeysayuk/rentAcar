import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ListResponseModel} from "../models/listResponseModel";
import {Rental} from "../models/rental";
import {Users} from "../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    apiUrl = environment.apiUrl + 'users/';
  constructor(private httpClient:HttpClient) { }

  getUsers(): Observable<ListResponseModel<Users>> {
    return this.httpClient.get<ListResponseModel<Users>>(this.apiUrl + 'getusers');
  }
  getUsersById(id:number): Observable<ListResponseModel<Users>> {
      return this.httpClient.get<ListResponseModel<Users>>(this.apiUrl + 'id?id=' + id);
    }

}
