import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Product } from 'src/app/classes/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  GetProductDetails() {
    return this.httpClient.get<Product[]>(`${environment.api_base_url}api/product`)
  }

  GetProductById(id: string) {
    return this.httpClient.get<Product>(`${environment.api_base_url}api/product/${id}`)
  }

  AddProduct(data:Product): Observable<any>{
    return this.httpClient.post(`${environment.api_base_url}api/product`,data);
  }

  UpdateProduct(id: string, data:Product) {
    return this.httpClient.put(`${environment.api_base_url}api/product/${id}`,data)
  }

  DeleteProduct(id: string) {
    return this.httpClient.delete(`${environment.api_base_url}api/product/${id}`)
  }
}
