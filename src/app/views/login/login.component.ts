import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private _serviceLogin:LoginService,
    private _tokenService:TokenService,
    private _router:Router
  ) { 
    this.loginForm=formBuilder.group({
      password:['',[Validators.required]],
      username:['',[Validators.required]],
    })
  }

  onSubmit(event:Event){
    event.preventDefault
    if (this.loginForm.valid) {
      this._serviceLogin.login(this.loginForm.value).subscribe(
        data=>{
          if(data){
            this._tokenService.setToken(data.ATO)
            this._router.navigate([''])
          }
          
        }
      )
    }else{
      this.loginForm.markAllAsTouched()
    }
  }
}
