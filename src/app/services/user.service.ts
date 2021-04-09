import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ListResponseModel} from '../models/listResponseModel';
import {Users} from '../models/users';
import {SingleResponseModel} from '../models/singleResponseModel';
import {Findeks} from '../models/findeks';
import {FindeksResponseDto} from '../models/findeksResponseDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + 'users/';

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<ListResponseModel<Users>> {
    return this.httpClient.get<ListResponseModel<Users>>(this.apiUrl + 'getusers');
  }

  getUserFindeks(findeks: Findeks) {
    return this.httpClient.post<SingleResponseModel<FindeksResponseDto>>(this.apiUrl + 'getfindeks',
      {
        'tcNo': findeks.tcNo.toString(),
        'dateOfYear': parseInt(findeks.dateOfYear.toString())
      });
  }

  getUsersById(id: number): Observable<SingleResponseModel<Users>> {
    return this.httpClient.get<SingleResponseModel<Users>>(this.apiUrl + 'id?id=' + id);
  }

  getUserByEmail(email: string) {
    return this.httpClient.get<SingleResponseModel<Users>>(this.apiUrl + 'getbyemail?email=' + email);
  }
}
