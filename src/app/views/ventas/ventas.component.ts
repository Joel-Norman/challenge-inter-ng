import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent {
  page = 1;
	pageSize = 5;
	collectionSize = 0;

	dataTable:any

	constructor(
    private modalService: NgbModal,
    private _ventaService:VentaService,
    private _messageService:MessageService,
  ) {
		
	}
  ngOnInit(): void {
	this.getList()
    
  }

  getList(){
	this._ventaService.list().subscribe(
		data=>{
		  	console.log(data)
		  	this.dataTable=data.data
		  	this.page = data.pagination.actualPage;
			
			this.collectionSize = data.pagination.totalResults;
		}
	  )
  }
	refresh() {
		this._ventaService.listPagination(this.pageSize,this.page).subscribe(
			data=>{
				this.dataTable=data.data
				this.page = data.pagination.actualPage;
				this.collectionSize = data.pagination.totalResults;
			}
		)
	}
  	
	show(content,item){
		this._ventaService.show(item.id).subscribe(data=>{
			if (data.success) {
        console.log(data)
        this._ventaService.item=data.data
				//this._clienteService.item={id:data.data.id,codigo:data.data.codigo,nombre:data.data.nombre};
				this.modalService.open(content, { centered: true });
			} else {
				this._messageService.showMessage('danger',data.message)
			}
			console.log(data)
			
		})
		
	}
	delete(item){
		this._ventaService.delete(item.id).subscribe(
			data=>{
				if (data.success) {
					console.log(data)
					this._messageService.showMessage('success','Venta eliminada con exito!!')
				} else {
					this._messageService.showMessage('danger',data.message)
				}
		})
	}
	
}
