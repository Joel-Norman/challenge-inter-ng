import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../apis/api';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

    //urlList=url+'/productos'
    url=url+'/productos'
    urlDelete=url+'/productos/eliminar'

    item:any
    isUpdate=false
  constructor(
    private http:HttpClient,
  ) { }

  listProduct(){
    return this.http.get<any>(this.url+'?search=m');
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
  list(){
    return this.http.get<any>(this.url);
  }
  search(query){
    return this.http.get<any>(this.url+'?search='+query);
  }
  listPagination(take,page){
    return this.http.get<any>(this.url+'?take='+take+'&page='+page);
  }
}