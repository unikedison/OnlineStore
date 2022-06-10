import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  updateProductForm!: FormGroup;
  product = new Product();
  id = "";

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params["id"];  

    this.updateProductForm = new FormGroup({
      brand: new FormControl("",Validators.required),
      title: new FormControl("",Validators.required),
      price: new FormControl("",Validators.required),
      description: new FormControl("",Validators.required),
      category: new FormControl("",Validators.required),
      imageUrl: new FormControl("",Validators.required)
    })
   }

  ngOnInit(): void {
    this.productService.GetProductById(this.id).subscribe((data:any) => {
      this.product = data;
      this.updateProductForm = new FormGroup({
        brand: new FormControl(this.product.brand,Validators.required),
        title: new FormControl(this.product.title,Validators.required),
        price: new FormControl(this.product.price,Validators.required),
        description: new FormControl(this.product.description,Validators.required),
        category: new FormControl(this.product.category,Validators.required),
        imageUrl: new FormControl(this.product.imageUrl,Validators.required)
      });
    })
    
  }

  Submit(): void{
    if (this.updateProductForm.valid) {
      this.productService.UpdateProduct(this.id,this.updateProductForm.value).subscribe((result) => {
        alert("Data Updated Successfully!")
        this.router.navigate(["/admin/product"]);
      },
        (error: Error) => {
          alert("Update Failed!")
        })
     }
     else {
      alert("invalid form!")
    }
  }


}
