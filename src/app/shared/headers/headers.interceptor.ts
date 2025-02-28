import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('eToken')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('eToken')!
      }
    })
  }

  return next(req);
};
