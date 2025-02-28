import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const myPlatformID = inject(PLATFORM_ID)
  if (isPlatformBrowser(myPlatformID)) {
    const userToken = localStorage.getItem('eToken')
    console.log(userToken)
    if (!userToken) router.navigate(['/login'])

    return (userToken) ? true : false;
  }
  else{
    return false;
  }
};
