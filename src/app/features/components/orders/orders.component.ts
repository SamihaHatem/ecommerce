import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { jwtDecode } from 'jwt-decode'
import { ordersI } from '../../../shared/interfaces/order.interface';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  private readonly ordersServices = inject(OrdersService)
  ordersList!: ordersI[]
  isLoading: boolean = true
  getUserOrders() {
    this.isLoading = true
    const decoded: any = jwtDecode(localStorage.getItem('eToken')!)
    this.ordersServices.getUserOrders(decoded.id).subscribe((response: any) => {
      console.log(response)
      this.ordersList = response
      this.isLoading = false
    }, (err: any) => {
      console.log(err)
      this.isLoading = false
    })
  }

  ngOnInit(): void {
    this.getUserOrders()
  }

}
