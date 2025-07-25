
import { Component,OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";
import { Account } from './_services/account';
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav, RouterOutlet, NgxSpinnerComponent]
})
export class App implements OnInit {
  
  private accountService = inject(Account);
  
  ngOnInit(): void{
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  
}
