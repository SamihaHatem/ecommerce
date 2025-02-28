import { Component, inject, OnInit } from '@angular/core';
import { LoadingComponent } from "../../../shared/components/loading/loading.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [LoadingComponent, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private readonly ordersService = inject(OrdersService)
  isLoading: boolean = false
  cartID!: string
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => this.cartID = params.cartID)
  }

  onMobileChange(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, '');
  }

  onlinePayment(form: any) {
    this.isLoading = true;
    this.ordersService.visaPayment(this.cartID, { shippingAddress: form.value }).subscribe((response: any) => {
      console.log("onlinePayment: ", response)
      this.isLoading = false;
      if (response.status == 'success') {
        open(response.session.url)
      }
    }, (err: any) => {
      console.log(err)
      this.isLoading = false;
    })
  }

  cashPayment(form: any) {
    this.isLoading = true;
    this.ordersService.cashPayment(this.cartID, { shippingAddress: form.value }).subscribe((response: any) => {
      console.log(response)
      this.isLoading = false;
      if (response.status == 'success') {
        Swal.fire({
          title: 'Done',
          icon: 'success'
        }).then(() => {
          this.router.navigate(['/allorders'])
        })
      }
    }, (err: any) => {
      console.log(err)
      this.isLoading = false;
    })
  }

}
