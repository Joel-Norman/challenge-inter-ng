import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../apis/api';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

    url=url+'/ventas'
    item:any;
  constructor(
    private http:HttpClient,
  ) { }

  save(item){
    return this.http.post<any>(this.url,item);
  }
  
  list(){
    return this.http.get<any>(this.url);
  }
  show(id){
    return this.http.get<any>(this.url+'/'+id);
  }
  listPagination(take,page){
    return this.http.get<any>(this.url+'?take='+take+'&page='+page);
  }
  delete(id){
    return this.http.post<any>(this.url+'/eliminar',{id:id});
  }
}