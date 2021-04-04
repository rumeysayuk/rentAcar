import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ResponseModel} from '../models/responseModel';
import {CarImageAdd} from '../models/carImageAdd';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = environment.apiUrl + 'carimages/';

  constructor(private httpClient: HttpClient) {
  }

  addImage(carImageAdd: CarImageAdd): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add", carImageAdd);
  }

}
