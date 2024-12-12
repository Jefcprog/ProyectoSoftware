import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';

export const validLoginGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router);
  let validate=false;
  if (typeof window !== 'undefined'){
    if(localStorage.getItem(environment.token)){
      validate=true;
    }else{
      _router.navigateByUrl("login")
    }
  }
  return validate;
};
