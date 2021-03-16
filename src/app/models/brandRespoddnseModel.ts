import {Brand} from './brand';
import {ResponseModel} from './responseModel';

export interface BrandRespoddnseModel extends ResponseModel{
  data: Brand;
}
