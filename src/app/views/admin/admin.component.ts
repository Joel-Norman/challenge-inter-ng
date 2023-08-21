import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewproductComponent } from 'src/app/components/modal/newproduct/newproduct.component';
import { Rubro } from 'src/app/models/models';
import { AdminService } from 'src/app/services/admin.service';
import { MessageService } from 'src/app/services/message.service';
import { ProductosService } from 'src/app/services/producto.service';
import { RubroService } from 'src/app/services/rubro.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  	page;
	pageSize;
	collectionSize;
	
	dataTable:any

	constructor(
	private _rubroService:RubroService,
	public productoService:ProductosService,
    private modalService: NgbModal,
	private messageService:MessageService,
  ) {
		
	}
  ngOnInit(): void {
    this.getList()
  }

  onInput(event){
	if(event.target.value.trim()){
		this.productoService.search(event.target.value).subscribe(
			data=>{
				this.dataTable=data.data
				this.page = data.pagination.actualPage;
				//this.pageSize =  data.pagination.resultPerPage
				this.collectionSize = data.pagination.totalResults;
			}
		)
	}
	
  }

	refresh() {
		this.productoService.listPagination(this.pageSize,this.page).subscribe(
			data=>{
				
				this.dataTable=data.data
				this.page = data.pagination.actualPage;
				this.collectionSize = data.pagination.totalResults;
			}
		)
	}
	openNew(content){
    	console.log(content)
		this.modalService.open(content, { centered: true });
	}

	edit(content,item){
		this.productoService.isUpdate=true;
		if(item.rubro_id){
			this._rubroService.item={id:item.rubro_id};
			this._rubroService.show().subscribe(
				data=>{
					console.log(data)
					if(data.success){
						this.productoService.item={id:item.id,codigo:item.codigo,nombre:item.nombre,precio:item.precio,rubro:data.data};
						this.modalService.open(content, { centered: true });
					}
				}
			)
		}else{
			this.productoService.item={id:item.id,codigo:item.codigo,nombre:item.nombre,precio:item.precio};
			this.modalService.open(content, { centered: true });
		}
	}
	show(contentShow,item){
		
		this.productoService.item={id:item.id};
		this.productoService.show().subscribe(data=>{
			if (data.success) {
				this.productoService.item=data.data
				this.modalService.open(contentShow, { centered: true });
			} else {
				this.messageService.showMessage('danger',data.message)
			}
			console.log(data)
			
		})
		
	}
	delete(item){
		this.productoService.item={id:item.id};
		this.productoService.delete().subscribe(data=>{
			console.log(data)
			if (data.success) {
				this.messageService.showMessage('success','Eliminado con exito!')
				this.getList()
			} else {
				this.messageService.showMessage('danger',data.message)
			}
			
		})
	}
	getRubro(id){
		this._rubroService.item={id:id};
		this._rubroService.show().subscribe(
			data=>{
				
				return data.data;
			}
		)
	}
	getList(){
		this.productoService.list().subscribe(
			data=>{
				
			  	this.dataTable=data.data
				this.page = data.pagination.actualPage;
				this.pageSize =  data.pagination.resultPerPage
				this.collectionSize = data.pagination.totalResults;
			}
		  )
	}
}
