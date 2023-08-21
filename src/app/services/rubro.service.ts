import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../apis/api';

@Injectable({
  providedIn: 'root'
})
export class RubroService {
    urlList=url+'/rubros'
    urlSave=url+'/rubros'
    urlDelete=url+'/rubros/eliminar'
    item:any;

    isUpdate=false;
  constructor(
    private http:HttpClient,
  ) { }

  save(item){
    return this.http.post<any>(this.urlSave,item);
  }
  update(item){
    return this.http.post<any>(this.urlSave+'/'+this.item.id,item);
  }
  show(){
    return this.http.get<any>(this.urlSave+'/'+this.item.id);
  }
  delete(){
    return this.http.post<any>(this.urlDelete,{id:this.item.id});
  }
  list(){
    return this.http.get<any>(this.urlList);
  }
  search(query){
    return this.http.get<any>(this.urlList+'?search='+query);
  }
  listPagination(take,page){
    return this.http.get<any>(this.urlList+'?take='+take+'&page='+page);
  }
}
