import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/classes/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : Product[] = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProducts(product: Product[]){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: Product){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice(): number{
    let total = 0;
    this.cartItemList.map((x:Product) =>{
      total += x.price;
    });
    return total;
  }

  removeCartItem(product: Product){
    this.cartItemList.map((x:Product, index: any)=>{
      if(product.productNo === x.productNo){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  emptyCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

}
 