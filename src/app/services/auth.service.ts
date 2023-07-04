import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get isLoggedIn(): boolean {
    if (this.isTokenExpired && !!this._idToken) {
      this.signOut();
    }
    const user: any = this._sessionStorage.getString('access_token');
    return !!user && !this.isTokenExpired ? true : false;
  }
  get idToken(): string {
    return this._idToken;
  }

  private authUserConfig: any = environment.authUserConfig;

  private _idToken: string = this._sessionStorage.getString('access_token');
  private _expirationDate: any =
    this._sessionStorage.getString('token_exp_date') || null;

  get isTokenExpired(): boolean {
    return !!this._idToken ? this._helper.isTokenExpired(this._idToken) : false;
  }

  private _helper: any = new JwtHelperService();

  constructor(
    private http: HttpClient,
    public _router: Router,
    private toast: ToastrService,
    private _sessionStorage: SessionStorageService
  ) {}

  signIn(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(
          `${this.authUserConfig.apiBaseUrl}/${this.authUserConfig.endpoints.login.path}`,
          data
        )
        .toPromise()
        .then((res: any) => {
          this.toast.success('Logged In Succussfully!');
          this._router.navigateByUrl('dashboard');
          this._idToken = !!res.token ? res.token : null;
          this._sessionStorage.set('access_token', this._idToken);
          this._expirationDate = this._helper.getTokenExpirationDate(
            this._idToken
          );
          this._sessionStorage.set('token_exp_date', this._expirationDate);
        })
        .catch((error: any) => {
          this.toast.error('Invalid Username or Password');
          reject(error);
        });
    });
  }

  signOut(): void {
    this._sessionStorage.set(this._idToken, null);
    try {
      this._sessionStorage.clearAll();
    } catch (e) {
      console.warn(e);
    }
    this._router.navigateByUrl('');
  }

  sendNotification(payload: any): Promise<any> {
    return this.http
      .post(
        `${this.authUserConfig.apiBaseUrl}/${this.authUserConfig.endpoints.sendNotification.path}`,
        payload
      )
      .toPromise()
      .then((res: any) => {
        this.toast.success('Notification Sent Successfully!');
      })
      .catch((error: any) => {
        this.toast.error('Notification not sent!');
      });
  }
}
