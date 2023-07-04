import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _isFormSubmitted: boolean = false;

  private _form: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  get form(): FormGroup {
    return this._form;
  }
  get isSubmitted(): boolean {
    return this._isFormSubmitted;
  }

  constructor(private _authSvc: AuthService, private _router: Router) {}

  get f() {
    return this._form.controls;
  }

  signIn(): void {
    this._isFormSubmitted = true;
    if (this._form.invalid) {
      return;
    }
    const data: any = {
      userName: this._form.value.userName,
      password: this._form.value.password
    };
    this._authSvc.signIn(data);
  }

  ngOnInit() {
    if (this._authSvc.isLoggedIn) {
      this._router.navigateByUrl('dashboard');
    }
  }
}
