import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailModalComponent } from './components/authentication/email-modal/email-modal.component';
import { ProximamenteComponent } from './components/proximamente/proximamente.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptorFn } from '@angular/common/http';
import { RecoveredComponent } from './components/authentication/recovered/recovered.component';
import { PersonComponent } from './components/person/person.component';
import { TableModule } from 'primeng/table';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyHttpInterceptor } from './interceptos/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmailModalComponent,
    ProximamenteComponent,
    RecoveredComponent,
    PersonComponent,
    CreatePersonComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    TableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
