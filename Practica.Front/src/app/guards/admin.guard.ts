import { ProximamenteComponent } from './../components/proximamente/proximamente.component';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const _router=inject(Router);
  const _service=inject(UserService)
  let validate=false;
  if (typeof window !== 'undefined'){
    if(localStorage.getItem(environment.token) && _service.Rol()){
      validate=true;
    }else{
      _router.navigateByUrl("proximamente")
    }
  }
  return validate;
};
