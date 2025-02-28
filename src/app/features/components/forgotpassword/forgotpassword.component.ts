import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  isLoading: boolean = false
  errMsg: string = ''
  resMsg: string = ''
  phase: string = 'one'
  private readonly router = inject(Router)

  constructor(private authServices: AuthService) { }

  forgotPassword(form: any) {
    this.isLoading = true;
    this.resMsg = ''
    this.errMsg = ''
    this.authServices.forgetPassword(form.value).subscribe((response: any) => {
      console.log(response)
      this.isLoading = false
      this.resMsg = response.message

      Swal.fire({
        title: this.resMsg,
        icon: 'success'
      }).then(() => {
        this.phase = 'two'
      })
    }, (err: HttpErrorResponse) => {
      console.log(err)
      this.errMsg = err.error.message
      this.isLoading = false
    })
  }

  verfiyCode(form: any) {
    this.isLoading = true;
    this.resMsg = ''
    this.errMsg = ''
    this.authServices.verifyResetCode(form.value).subscribe((response: any) => {
      console.log(response)
      this.isLoading = false
      this.resMsg = response.message

      this.router.navigate(['/resetPassword'])
    }, (err: HttpErrorResponse) => {
      console.log(err)
      this.errMsg = err.error.message
      this.isLoading = false
    })
  }
}
