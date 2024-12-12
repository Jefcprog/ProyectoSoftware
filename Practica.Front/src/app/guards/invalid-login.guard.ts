import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

export const invalidLoginGuard: CanActivateFn = (route, state) => {
  let validate=true;
  const _router=inject(Router);
  if (typeof window !== 'undefined'){
    if(localStorage.getItem(environment.token)){
      validate=false;      
      _router.navigateByUrl("person");
    }
  }
  return validate;};
