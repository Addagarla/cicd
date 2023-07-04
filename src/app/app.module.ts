import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guards/auth.guard';
import { AuthTokenHttpInterceptorProvider } from './services/auth-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { LoaderComponent } from './loader/loader.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}
@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, LoaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: []
      }
    })
  ],
  providers: [AuthGuard, AuthTokenHttpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
