import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private authService: AuthService) {}
  onClick(email: string, password: string) {
    this.authService.postSigninCredentials(email, password).subscribe(res => {
      console.log(res);
    });
  }
}
