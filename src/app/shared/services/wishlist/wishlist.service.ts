import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  addProductToWishlist(productId: string) {
    return this.http.post(environment.basurl + '/wishlist', { productId })
  }

  removeProductFromWishlist(prodId: string) {
    return this.http.delete(environment.basurl + '/wishlist/' + prodId)
  }

  getUserWishlist() {
    return this.http.get(environment.basurl + '/wishlist')
  }
}
