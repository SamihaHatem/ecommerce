import { Injectable } from '@angular/core';
import { usersI } from '../../interfaces/users.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  registerUser(user: { name: string, email: string, password: string, rePassword: string, phone: string }): Observable<any> {
    return this.http.post(environment.basurl + '/auth/signup', user)
  }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post(environment.basurl + '/auth/signin', user)
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post(environment.basurl + '/auth/forgotPasswords', { email })
  }

  verifyResetCode(resetCode: string): Observable<any> {
    return this.http.post(environment.basurl + '/auth/verifyResetCode', { resetCode })
  }

  // token
  changeMyPassword(reqBody: { currentPassword: string, password: string, rePassword: string }): Observable<any> {
    return this.http.put(environment.basurl + '/users/changeMyPassword', reqBody)
  }

  resetPassword(reqBody: { email: string, newPassword: string }): Observable<any> {
    return this.http.put(environment.basurl + '/auth/resetPassword', reqBody)
  }

  // token
  updateUserData(reqBody: { name: string, email: string, phone: string }): Observable<any> {
    return this.http.put(environment.basurl + '/users/updateMe', reqBody)
  }

  //token
  verifyToken(): Observable<any> {
    return this.http.get(environment.basurl + '/auth/verifyToken')
  }


}
