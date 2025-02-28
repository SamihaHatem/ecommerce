import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  token = localStorage.getItem('eToken')!
  constructor(private http: HttpClient) { }

  addProductToCart(productId: string): Observable<any> {
    return this.http.post(environment.basurl + '/cart', { productId })
  }

  getCurrentUserCart(): Observable<any> {
    return this.http.get(environment.basurl + '/cart')
  }

  updateCartProductQuantity(productId: string, reqBody: { count: number }) {
    return this.http.put(environment.basurl + '/cart/' + productId, reqBody)
  }


  removeCartProduct(productID: string): Observable<any> {
    return this.http.delete(environment.basurl + '/cart/' + productID)
  }

  clearCart() {
    return this.http.delete(environment.basurl + '/cart')
  }
}
