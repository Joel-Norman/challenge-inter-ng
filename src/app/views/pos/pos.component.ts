import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, debounceTime, from, map, switchMap } from 'rxjs';
import { CustomDateParserFormatter } from 'src/app/customs/dateparserformatter.custom';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';
import { ProductosService } from 'src/app/services/producto.service';
import { RubroService } from 'src/app/services/rubro.service';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss'],
  providers: [
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
	],
})
export class PosComponent {
  
	dataTable=[]
  	dateModel:any=''
  	selectedCliente:any=''
  	selectedProducto:any
	
	observacion;

	dateValid=true;
	clienteValid=true;
	listValid=true;
  searchProducto: OperatorFunction<string, any> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
      switchMap((term) => {
        if (term === '') {
          return from([]);
        } else {
          return this.productoService.search(term);
        }
      }),
      map(response => response.data)
		);
  searchCliente: OperatorFunction<string, any> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
      switchMap((term) => {
        if (term === '') {
          return from([]);
        } else {
          return this._clienteService.search(term);
        }
      }),
      map(response => response.data)
		);

	formatter = (x: { nombre: string }) => x.nombre;
	
	constructor(
		private formBuilder:FormBuilder,
    private _adminService:AdminService,
	  private _clienteService:ClienteService,
	  public productoService:ProductosService,
    private modalService: NgbModal,
	  private messageService:MessageService,
  ) {
		
	}
	
	
  ngOnInit(): void {
    //this.getList()
  }

  onInput(event){
	if(event.target.value.trim()){
		this.productoService.search(event.target.value).subscribe(
			data=>{
				this.dataTable=data.data
			}
		)
	}
	
  }

	refreshCountries() {
		/*this.countries = COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);*/
	}
	saveNew(){
		console.log()
		if(this.controlCliente()&&this.controlDate()&&this.controlList()){
			console.log(this.getVenta())
			this._adminService.save(this.getVenta()).subscribe(
				data=>{
					console.log(data)
					this.messageService.showMessage('success','Venta creada con exito!!')
				}
			)
		}else{
			console.log("Error control de datos")
		}
	}

	getVenta(){
		let venta
		if(this.observacion){
			venta={
				cliente_id:this.selectedCliente.id,
				fecha:this.getDate(),
				observaciones:this.observacion,
				importe_total:this.sumTotal(),
				items:this.getProuctos()
			}
		}else{
			venta={
				cliente_id:this.selectedCliente.id,
				fecha:this.getDate(),
				importe_total:this.sumTotal(),
				items:this.getProuctos()
			}
		}
		return venta;
	}
	controlDate(){
		this.dateValid=this.dateModel.year&&this.dateModel.month&&this.dateModel.day
		return this.dateModel.year&&this.dateModel.month&&this.dateModel.day
	}
	controlCliente(){
		this.clienteValid=this.selectedCliente.id
		return this.clienteValid
	}
	controlList(){
		this.listValid=this.dataTable.length!=0
		return this.listValid
	}
	getDate(){
		console.log(this.dateModel)
		return this.dateModel.year+'-'+this.dateModel.month+'-'+this.dateModel.day
	}
	getProuctos(){
		let list=[]
		for (let i of this.dataTable) {
			list.push({producto_id:i.producto_id,cantidad:i.cantidad,importe_total:i.cantidad*i.precio})
		}
		return list
	}
	/*edit(content,item){
		this.productoService.isUpdate=true;
		if(item.rubro_id){
			this._rubroService.item={id:item.rubro_id};
			this._rubroService.show().subscribe(
				data=>{
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
	}*/
	show(content,item){
		/*this._rubroService.isUpdate=true;
		this._rubroService.item={id:item.id,codigo:item.codigo,nombre:item.nombre};
		this._rubroService.show().subscribe(data=>{
			if (data.success) {
				this._rubroService.item={id:data.data.id,codigo:data.data.codigo,nombre:data.data.nombre};
				this.modalService.open(content, { centered: true });
			} else {
				this.messageService.showMessage('danger',data.message)
			}
			console.log(data)
			
		})*/
		
	}
	delete(item){
		this.dataTable=this.dataTable.filter(element=>element!=item)
	}
	/*getRubro(id){
		this._rubroService.item={id:id};
		this._rubroService.show().subscribe(
			data=>{
				
				return data.data;
			}
		)
	}*/
	getList(){
		this.productoService.list().subscribe(
			data=>{
			  this.dataTable=data.data
			}
		  )
	}

  onOptionSelected(event): void {
    console.log(event.item);
    let item=event.item;
    this.dataTable.push({producto_id:item.id,nombre:item.nombre,precio:item.precio,cantidad:1,importe_total:0,})
  }
  deleteClient(){
	
	this.selectedCliente='Consumidor Final'
  }
  sumTotal(){
	return this.dataTable.reduce((sum, producto) => sum + producto.precio*producto.cantidad, 0);
  }
}
