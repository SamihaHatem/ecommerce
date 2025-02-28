import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {

  token = localStorage.getItem('eToken')!
  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(environment.basurl + '/categories')
  }

  getSubCategoriesByCatID(categoryID: string) {
    return this.http.get(environment.basurl + `/categories/${categoryID}/subcategories`)
  }

  getAllProducts() {
    return this.http.get(environment.basurl + '/products')
  }

  getProductByID(_id: string) {
    return this.http.get(`${environment.basurl}/products/${_id}`)
  }

  getAllBrands() {
    return this.http.get(environment.basurl + '/brands')
  }


}
