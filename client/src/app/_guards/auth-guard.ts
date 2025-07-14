import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Account } from '../_services/account';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const accountSrvice = inject(Account)
  const toastr = inject(ToastrService)

  if(accountSrvice.currentUser()){
    return true;
  }else {
    toastr.error('You shall not pass!');
    return false;
  }

  return true;
};
