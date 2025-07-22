import { Component, inject, OnInit, output } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Account } from '../_services/account';
import { JsonPipe } from '@angular/common';
import { TextInput } from "../_forms/text-input/text-input";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  private accoutService = inject(Account);
  private fb = inject(FormBuilder);
  private router = inject(Router)
  //@Input() userFormHomeComponent: any;
  cancelRegister = output<boolean>();
  registerForm : FormGroup = new FormGroup({});
  validationErrors : string[] | undefined;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username :  ['' , Validators.required],
      knownAs: ['' , Validators.required],
      dateOfBirth: ['' , Validators.required],
      city: ['' , Validators.required],
      country: ['' , Validators.required],
      password :  ['' , [Validators.required , Validators.minLength(4) , Validators.maxLength(8)]],
      confirmPassword :  ['', [Validators.required , this.matchValues('password')]],
    });
    this.registerForm.controls['passwrod'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn{
    return(control: AbstractControl) =>{
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching : true}
    }
  }

  register(){
    const dob = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth: dob});
    this.accoutService.register(this.registerForm.value).subscribe({
      next: _ => this.router.navigateByUrl('/members') ,
      error : error => this.validationErrors = error
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dob: string | undefined){
    if(!dob) return; 
    return new Date(dob).toISOString().slice(0 , 10);
  }
}
