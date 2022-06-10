import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    RegisterComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    FormsModule ,
    ReactiveFormsModule,
    HttpClientModule,    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
