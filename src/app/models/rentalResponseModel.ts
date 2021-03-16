import {Brand} from './brand';
import {ResponseModel} from './responseModel';

export interface RentalResponseModel extends ResponseModel{
  data: Brand [];
}
