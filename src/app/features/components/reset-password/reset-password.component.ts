import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  isLoading: boolean = false
  errMsg: string = ''
  private readonly authServices = inject(AuthService)
  private readonly router = inject(Router)
  private readonly myPlatformID = inject(PLATFORM_ID)

  resetPassword(form: any) {
    console.log(form.value)
    this.authServices.resetPassword(form.value).subscribe((response: any) => {
      console.log(response)

      if (isPlatformBrowser(this.myPlatformID)) {
        localStorage.setItem('eToken', response.token)
      }
      this.router.navigate(['/home'])

      this.isLoading = false;
    }, (err: any) => {
      console.log(err)
    })
  }
}
