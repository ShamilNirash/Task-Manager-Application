import { HttpResponse } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { shareReplay } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private authService: AuthService,private route:Router) { }
  onClick(email: string, password: string) {
    console.log("clicked")
    this.authService.signLogCredentials(email, password,'users').subscribe((res)=>{
      console.log("subscribe")
      if(res.status==200){
        this.route.navigate(['/lists']);
      }
    })
  }
}
