// Modules
import { Injectable, EventEmitter } from '@angular/core';
// models
import { Product } from '../models/interfaces.model';

@Injectable({
  providedIn: 'root',
})
export class DataItemService {
  // variable
  public dataCards: Product[] = [];
  public totalPrice: number = 0;

  // Emit total price
  public totalPriceEmitter: EventEmitter<number> = new EventEmitter();
  raiseDataEventEmitter(data: number) {
    this.totalPriceEmitter.emit(data);
  }

  /* Start: Cards add and get methods */
  addCart(card: Product) {
    this.dataCards = this.dataCards.filter((el) => el.id !== card.id);
    this.dataCards.unshift(card);
  }
  // Update Cart
  updateCart(card: Product, amountSelected: number) {
    this.dataCards.filter((el) => el.id === card.id)[0].amount = amountSelected;
  }
  //Get All Cards
  getCards() {
    return this.dataCards;
  }
  /* End: Cards add and get methods */

  // Update Total
  updateTotal(total: number) {
    this.totalPrice = total;
    console.log('Service', this.totalPrice);
  }
  // Get Delete Cart
  deleteCart(card: Product) {
    console.log(this.dataCards);
    this.dataCards = this.dataCards.filter((el) => el.id !== card.id);
    console.log(this.dataCards);
  }

  // Get Total Price
  getTotal(cards: Product[]) {
    const price: number[] = cards.map((el: Product) =>
      el.amount ? el.amount * el.price : 0
    );
    this.totalPrice = price.reduce(
      (acc: number, current: number | undefined): number =>
        acc + Number(current),
      0 as number
    );
    this.updateTotal(Number(this.totalPrice.toFixed(2)));
    this.raiseDataEventEmitter(Number(this.totalPrice.toFixed(2)));
    console.log('Service', this.totalPrice);
    return Number(this.totalPrice.toFixed(2));
  }
}