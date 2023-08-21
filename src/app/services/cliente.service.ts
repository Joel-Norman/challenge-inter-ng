import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../apis/api';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  isUpdate=false;
  item:any
  urlDelete=url+'/clientes/eliminar'
  url=url+'/clientes'
  constructor(
    private http:HttpClient,
  ) { }

  list(){
    return this.http.get<any>(this.url);
  }

  save(item){
    return this.http.post<any>(this.url,item);
  }
  update(item){
    return this.http.post<any>(this.url+'/'+this.item.id,item);
  }
  show(){
    return this.http.get<any>(this.url+'/'+this.item.id);
  }
  delete(){
    return this.http.post<any>(this.urlDelete,{id:this.item.id});
  }
  search(query){
    return this.http.get<any>(this.url+'?search='+query);
  }
  listPagination(take,page){
    return this.http.get<any>(this.url+'?take='+take+'&page='+page);
  }
}