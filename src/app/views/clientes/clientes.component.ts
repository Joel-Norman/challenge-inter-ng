import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';
import { RubroService } from 'src/app/services/rubro.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
	isDisable=false;//esta desactivado por que produce un error en el backend, las ventas quedan en null
  page;
	pageSize=5;
	collectionSize;

	dataTable:any

	constructor(
    private _clienteService:ClienteService,
    private modalService: NgbModal,
	public messageService:MessageService,
	
  ) {
		
	}
  ngOnInit(): void {
	this.getList()
    
  }
  onInput(event){
	if(event.target.value.trim()){
		this._clienteService.search(event.target.value).subscribe(
			data=>{
				this.dataTable=data.data
				this.page = data.pagination.actualPage;
				this.collectionSize = data.pagination.totalResults;
			}
		)
	}
	
  }
  getList(){
	this._clienteService.list().subscribe(
		data=>{
		  	console.log(data)
		  	this.dataTable=data.data
		  	this.page = data.pagination.actualPage;
			this.collectionSize = data.pagination.totalResults;
		}
	  )
  }
  	refresh() {
		this._clienteService.listPagination(this.pageSize,this.page).subscribe(
			data=>{
			
				this.dataTable=data.data
				this.page = data.pagination.actualPage;
				this.collectionSize = data.pagination.totalResults;
			}
		)
	}
  	openVerticallyCentered(content) {
		this._clienteService.item=undefined
		this._clienteService.isUpdate=false;
		this.modalService.open(content, { centered: true });
	}
	edit(content,item){
		this._clienteService.isUpdate=true;
		this._clienteService.item={id:item.id,cuit:item.cuit,nombre:item.nombre,domicilio:item.domicilio,email:item.email,telefono:item.telefono};
		this.modalService.open(content, { centered: true });
	}
	show(content,item){
		this._clienteService.isUpdate=true;
		this._clienteService.item={id:item.id};
		this._clienteService.show().subscribe(data=>{
			if (data.success) {
				this._clienteService.item={id:data.data.id,cuit:data.data.cuit,nombre:data.data.nombre,domicilio:data.data.domicilio,email:data.data.email,telefono:data.data.telefono};
				this.modalService.open(content, { centered: true });
			} else {
				this.messageService.showMessage('danger',data.message)
			}
			console.log(data)
			
		})
		
	}
	delete(item){
		this._clienteService.item={id:item.id};
		this._clienteService.delete().subscribe(data=>{
			console.log(data)
			if (data.success) {
				this.getList()
				this.messageService.showMessage('success','Eliminado con exito!')
			} else {
				this.messageService.showMessage('danger',data.message)
			}
			
		})
	}
	public changeSuccessMessage() {
		this.messageService.showMessage('danger','mensaje de danger')
	}
	
}
