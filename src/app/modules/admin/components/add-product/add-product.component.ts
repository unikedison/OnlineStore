import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/classes/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm!: FormGroup;
  product = new Product();

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      brand: new FormControl("",Validators.required),
      title: new FormControl("",Validators.required),
      price: new FormControl("",Validators.required),
      description: new FormControl("",Validators.required),
      category: new FormControl("",Validators.required),
      imageUrl: new FormControl("",Validators.required)
    })
  }

  imageUpload(e:any){
    console.log(e.target.files[0]);
  }

  Submit(): void{
    if (this.addProductForm.valid) {
      this.productService.AddProduct(this.addProductForm.value).subscribe((result) => {
        alert("Product Added Successfully!")
        this.router.navigate(["/admin/product"]);
      },
        (error: Error) => {
          alert(error);
        })
     }
     else {
      alert("invalid form!")
    }
  }

}
