import {Injectable} from '@angular/core';
import {Car} from '../models/car';
import {CartItems} from '../models/cartItems';
import {CartItem} from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
  }

  addToCart(car: Car) {
    let cartItem = new CartItem();
    cartItem.car = car;
    CartItems.push(cartItem);
  }

  list(): CartItem[] {
    return CartItems;
  }

  removeFromCart(car: Car) {

    let item: CartItem = CartItems.find(c => c.car.carId=== car.carId);
    CartItems.splice(CartItems.indexOf(item), 1);
  }
}
