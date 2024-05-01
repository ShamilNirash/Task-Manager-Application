import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router:Router) { }
  onClick(email: string, password: string) {
    this.authService.signLogCredentials(email, password,'users/login').subscribe((res)=>{
      if(res.status==200){
        this.router.navigate(['/lists']);
      }
    })
  }
}
