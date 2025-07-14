
import { Component,OnInit, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./nav/nav";
import { Account } from './_services/account';
import { Home } from "./home/home";

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav, RouterOutlet]
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
