import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../../shared/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly authServices = inject(AuthService)
  private readonly router = inject(Router)
  isLoading: boolean = false
  errMsg: string = ''
  constructor() { }

  onMobileChange(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, '');
  }

  register(form: any) {
    this.errMsg = ''
    this.isLoading = true;
    this.authServices.registerUser(form.value).subscribe((response: any) => {
      console.log(response)
      if (response.message == 'success') {
        const myPlatformID = inject(PLATFORM_ID)

        if (isPlatformBrowser(myPlatformID)) {
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
