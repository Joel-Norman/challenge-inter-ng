import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, OperatorFunction, debounceTime, from, map, switchMap } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { ProductosService } from 'src/app/services/producto.service';
import { RubroService } from 'src/app/services/rubro.service';

@Component({
  selector: 'modal-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {
  @Input() modal:any;

  selectedRubro:any='';
  form:FormGroup;

  constructor(
    private _productoService:ProductosService,
    private _formBuilder:FormBuilder,
    private _rubroService:RubroService,
    public messageService:MessageService,

  ){
    this.form=_formBuilder.group({
      
      codigo:['',[Validators.required]],
      nombre:['',[Validators.required]],
      precio:[null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      rubro:['',],
    })
  }
  ngOnInit(): void {
    if(this._productoService.item){
      this.selectedRubro=this._productoService.item.rubro
      this.form.patchValue(this._productoService.item)
    }
    
  }
  public model: any;

	search: OperatorFunction<string, any> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
      switchMap((term) => {
        if (term === '') {
          return from([]);
        } else {
          return this._rubroService.search(term);
        }
      }),
      map(response => response.data)
		);

	formatter = (x: { nombre: string }) => x.nombre;


  onSubmit(event:Event){
    event.preventDefault
    
    if (this.form.valid) {
      if(this._productoService.isUpdate){
        console.log("update")
        this.update()
      }else{
        this.new()
        console.log("exito!!")
      }
    }else{
      this.form.markAllAsTouched()
      console.log("Error!!")
    }
  }

  new(){
    
    this._productoService.save(this.getProducto()).subscribe(
      data=>{
        console.log(data)
        if (data.success) {
          this.messageService.showMessage('success','Guardado con exito!')
          this.modal.close('Close click')
        } else {
          this.messageService.showMessage('danger',data.message)
        }
      }
    )
  }
  update(){
    this._productoService.update(this.getProducto()).subscribe(
      data=>{
        console.log(data)
        if(data.success){
          this.messageService.showMessage('success','Actualizado con exito!')
          this.modal.close('Close click')
        }else{
          this.messageService.showMessage('danger',data.message)
        }
      }
    )
  }
  getProducto(){
    let producto;
    if(this.selectedRubro){
      if(this.selectedRubro.id){
        producto={id:this._productoService.item.id,nombre:this.form.value.nombre,codigo:this.form.value.codigo,precio:this.form.value.precio,rubro_id:this.form.value.rubro.id}
      }else{
        producto={id:this._productoService.item.id,nombre:this.form.value.nombre,codigo:this.form.value.codigo,precio:this.form.value.precio}
      }
    }else{
      producto={id:this._productoService.item.id,nombre:this.form.value.nombre,codigo:this.form.value.codigo,precio:this.form.value.precio}
    }
    return producto;
  }

}
