import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'message-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert: NgbAlert;
  constructor(
    public messageService:MessageService
  ){

  }

  ngOnInit(): void {
    //setTimeout(() => this.staticAlert.close(), 20000);

		this.messageService.success.subscribe((message) => (this.messageService.message = message));
		this.messageService.success.pipe(debounceTime(2500)).subscribe(() => {
			if (this.selfClosingAlert) {
				this.selfClosingAlert.close();
			}
		});
  }
  

	staticAlertClosed = false;

	
  
}
