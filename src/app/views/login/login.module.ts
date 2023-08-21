import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login.component';
import { loginRoutes } from './login.routes';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(loginRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class LoginModule { }
