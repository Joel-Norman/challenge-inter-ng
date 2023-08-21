import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

    ATO_KEY='ATO_KEY'
  constructor(
    private http:HttpClient,
  ) { }

  setToken(key){
    window.localStorage.setItem(this.ATO_KEY,key);
  }
  getToken(){
    return window.localStorage.getItem(this.ATO_KEY);
  }
}