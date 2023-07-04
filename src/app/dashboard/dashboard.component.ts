import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private _isFormSubmitted: boolean = false;

  get form(): FormGroup {
    return this._form;
  }
  get isSubmitted(): boolean {
    return this._isFormSubmitted;
  }
  get f() {
    return this._form.controls;
  }
  private _form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(public _router: Router, private _authSvc: AuthService) {}

  ngOnInit(): void {
    history.pushState(null, '');
    fromEvent(window, 'popstate')
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(_ => {
        history.pushState(null, '');
      });
  }

  signOut() {
    this._authSvc.signOut();
  }

  send() {
    this._isFormSubmitted = true;
    if (this._form.invalid) {
      return;
    }
    const payload: any = {
      title: this._form.value.title,
      message: this._form.value.message
    };
    this._authSvc.sendNotification(payload);
    if ((this._isFormSubmitted = true)) {
      this._isFormSubmitted = false;
      this._form.reset();
    }
  }
}
