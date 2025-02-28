import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const redirectGuard: CanActivateFn = (route, state) => {
  const myPlatformID = inject(PLATFORM_ID)

  if (isPlatformBrowser(myPlatformID)) {
    const router = inject(Router)
    const userToken = localStorage.getItem('eToken')
    console.log(userToken)
    if (userToken) router.navigate(['/home'])
    return (!userToken) ? true : false;
  }
  else {
    return false;
  }

};
