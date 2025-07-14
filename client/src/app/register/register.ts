import { Component, inject, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Account } from '../_services/account';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private accoutService = inject(Account);
  private toastr = inject(ToastrService);
  //@Input() userFormHomeComponent: any;
  cancelRegister = output<boolean>();
  model : any = {}

  register(){
    this.accoutService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error : error => this.toastr.error(error.error)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
