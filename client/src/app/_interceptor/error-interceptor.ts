import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const toast = inject(ToastrService)

  return next(req).pipe(
    catchError(error =>{
      if(error){
        switch (error.status) {
          case 400:
            if(error.error.errors){
              const modalStateErrors = [];
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modalStateErrors.push(error.error.errors[key])
                }
              }
              throw modalStateErrors.flat();
            }else {
              toast.error(error.error , error.status);
            }
            break;
          case 401:
            toast.error("Unauthorised" , error.status);
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtra : NavigationExtras= {state: {error: error.error}};
            router.navigateByUrl('/server-error' , navigationExtra);
            break;
          default:
            toast.error("Somthing uexpected went wrong");
            break;
        }
      }
      throw error;
    })
  )
};
