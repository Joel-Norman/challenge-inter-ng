import { HttpClient } from '@angular/common/http';
import { Injectable, TemplateRef } from '@angular/core';
import { url } from '../apis/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    message = '';
    success = new Subject<string>();
    type;
  constructor(
    
  ) { }

    public showMessage(type,mje) {
      this.type=type;
      this.message=mje;
		  this.success.next(this.message);
    }
  }
