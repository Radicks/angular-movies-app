import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private inMemoryAccessToken: string = "";
  private accessTokenExpiration!: Date;

  constructor(private httpClient: HttpClient) { }

  register(email: string, password: string) {
    return this.httpClient.post<any>(`/api/auth/register`, {email: email, password: password});
  }

  logIn(email: string, password: string) {
    const observable = this.httpClient.post<any>(`/api/auth/login`, {email: email, password: password});

    return observable.pipe(
      tap(data =>{
        this.inMemoryAccessToken = data.accessToken;
        this.accessTokenExpiration = new Date(data.accessTokenExpirationDate);
        localStorage.setItem("currentUser", JSON.stringify(new User(data.id, data.email)));
        localStorage.setItem("refreshToken", data.refreshToken);
      })
    )
  }

  logOut() {
    this.accessTokenExpiration = new Date(0);
    this.inMemoryAccessToken = "";
    const refreshToken = localStorage.getItem("refreshToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");

    return this.httpClient.delete(`/api/auth/revokerefreshtoken/${refreshToken}`);
  }

  async getAccessToken(): Promise<string> {
    if (!this.accessTokenExpiration || Date.now() >= this.accessTokenExpiration.getTime()) {
      const data = await this.refreshToken();
      this.inMemoryAccessToken = data.accessToken;
      this.accessTokenExpiration = new Date(data.accessTokenExpirationDate);
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    return this.inMemoryAccessToken;
  }

  private refreshToken(): Promise<any> {
    return this.httpClient.post<any>(`/api/auth/refreshtoken`, { refreshToken: localStorage.getItem('refreshToken') }).toPromise();
  }

  get currentUser(): User {
    const json = localStorage.getItem("currentUser");
    return json ? JSON.parse(json) : null;
  }

  get isCurrentUserLoggedIn(): boolean {
    return this.currentUser !== null;
  }
}
