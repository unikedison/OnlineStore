import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productList : Product[] = [];
  grandTotal = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(data =>{
      this.productList = data;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeItem(product:Product){
    this.cartService.removeCartItem(product);
  }

  EmptyCart(){
    if(confirm("Do you want to empty the cart?")){
      this.cartService.emptyCart();
    }
  }

}
