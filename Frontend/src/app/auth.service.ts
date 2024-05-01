import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL;
  constructor(private http: HttpClient) {
    this.BASE_URL = "http://localhost:3000";
  }

  signLogCredentials(email: string, password: string, url: string) {
    return this.http.post(`${this.BASE_URL}/${url}`, { email, password }, { observe: 'response' }).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.saveToLocalStorage(
          res.headers.get('x-access-token') || '',
          res.headers.get('x-refresh-token') || '',
          res.body._id
        );

      }))
  }







  //signup credential save to local storage
  private saveToLocalStorage(accessToken: string, refreshToken: string, id: string) {

    localStorage.setItem("userId", id);
    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("refresh-token", refreshToken);

  }

  //get access token
  getAccessToken() {
    return localStorage.getItem('access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }
  getUserId() {
    return localStorage.getItem('userId')
  }
  setAccessToken(token: string) {
    localStorage.setItem('access-token', token)
  }

  // delete local storage
  logout() {
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('access-token');
    localStorage.removeItem('userId');
  }



  /* getNewAccessToken() {
    return this.http.get(`${this.BASE_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.getRefreshToken()||'',
        '_id': this.getUserId()||''
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(res.headers.get('x-access-token')||'');
      })
    )
  } */
}