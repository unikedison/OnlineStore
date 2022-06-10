import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productDetails = <Product[]>[];
  displayDetails = <Product[]>[];
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.GetData();
  } 

  current = 0;
  pageLength = 0;
   GetData(step:number=0){
     this.current = this.current+step;
    this.productService.GetProductDetails().subscribe((data: Product[]) => {      
      this.productDetails =  data;
      this.displayDetails = this.productDetails.slice(this.current, this.current+10);      
     this.pageLength =  this.productDetails.length-10;
    }); 
   }

  DeleteProduct(id: string):void{
    if(confirm("Do you want to delete the product details?")){
      this.productService.DeleteProduct(id).subscribe((data) =>{
        alert("Product deleted successfully!");        
        location.reload();
      });
    }
  }

}
