import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../apis/api';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

    url=url+'/ventas'
  constructor(
    private http:HttpClient,
  ) { }

  save(item){
    return this.http.post<any>(this.url,item);
  }
  
}