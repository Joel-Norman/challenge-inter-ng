import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http:HttpClient,
  ) { }

  login(item){
    return this.http.post<any>('https://interneg.ddns.net/api-challenge/login',item);
  }
}
