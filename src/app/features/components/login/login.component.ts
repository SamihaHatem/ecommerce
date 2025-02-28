import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly authServices = inject(AuthService)
  private readonly router = inject(Router)
  isLoading: boolean = false
  errMsg: string = ''
  private readonly myPlatformID = inject(PLATFORM_ID)
  constructor() { }

  onMobileChange(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, '');
  }

  login(form: any) {
    this.isLoading = true;
    this.errMsg = ''
    this.authServices.login(form.value).subscribe((response: any) => {
      console.log(response)
      if (response.message == 'success') {
        if (isPlatformBrowser(this.myPlatformID)) {
          localStorage.setItem('eUser', JSON.stringify(response.user))
          localStorage.setItem('eToken', response.token)
        }
        this.router.navigate(['/home'])
      }
      this.isLoading = false;
    }, (err: HttpErrorResponse) => {
      console.log(err)
      this.isLoading = false;
      this.errMsg = err.error.message
    })
  }
}
