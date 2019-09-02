import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
// import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { fakeBackendProvider } from './backen/fake.backend';
import { ErrorInterceptor } from './backen/error.interceptor';
import { JwtInterceptor } from './backen/jwt.interceptor';

import { config } from '../typings';
import { Register2Component } from './register2/register2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GroupComponent,
    ChatComponent,
    HomeComponent,
    // UserComponent,
    RegisterComponent,
    Register2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
