import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  cashPayment(cartId: string, reqBody: { shippingAddress: { details: string, phone: string, city: string } }): Observable<any> {
    return this.http.post(`${environment.basurl}/orders/${cartId}`, reqBody)
  }

  visaPayment(cartId: string, reqBody: { shippingAddress: { details: string, phone: string, city: string } }): Observable<any> {
    return this.http.post(`${environment.basurl}/orders/checkout-session/${cartId}?url=${environment.frontendUrl}`, reqBody)
  }

  getUserOrders(userId: string): Observable<any> {
    return this.http.get(`${environment.basurl}/orders/user/${userId}`)
  }
}
