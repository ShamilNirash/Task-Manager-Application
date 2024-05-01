import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, Subject, catchError, empty, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestHeaderSetInterceptor implements HttpInterceptor {

  constructor(private authservice: AuthService, private router:Router) { }
  refreshingAccessToken: boolean = false;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = this.requestHeaderSet(request);
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          alert("session is expired")
         this.authservice.logout();
         this.router.navigate(['/user/login']);

         
             
        }
        return throwError(error);
      })
    )
  }

 /*  private refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authservice.getNewRefreshToken().pipe(
        tap(() => {
          console.log("Access Token Refreshed!");
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next(true);
        })
      )
    }
  } */


  private requestHeaderSet(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authservice.getRefreshToken()
    if (token) {
      return request.clone({ setHeaders: { 'x-refresh-token': token } })
    }
    return request;
  }
}


