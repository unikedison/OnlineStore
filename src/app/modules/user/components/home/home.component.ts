import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { ProductService } from 'src/app/modules/admin/services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList = <Product[]>[];
  displayProduct = <Product[]>[];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService.GetProductDetails().subscribe((data: Product[]) => {      
      this.productList =  data;
      this.displayProduct = data;
    }); 
  }

  AddToCart(product:Product){
    this.cartService.addToCart(product);
  }

  ViewByCategory(category: string){
    this.displayProduct = [];
    this.displayProduct = this.productList.filter(x => x.category == category);
  }

}
