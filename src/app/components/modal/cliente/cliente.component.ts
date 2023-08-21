import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';
import { RubroService } from 'src/app/services/rubro.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'modal-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  @Input() modal:any;

  form:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private _clienteService:ClienteService,
    private _tokenService:TokenService,
    public messageService:MessageService,
    private modalService: NgbModal,
  ) { 
    this.form=formBuilder.group({
      nombre:['',[Validators.required]],
      cuit:['',[Validators.required]],
      email:['',[Validators.email]],
      domicilio:[''],
      telefono:[''],
    })
  }
  ngOnInit(): void {
    if(this._clienteService.item){
      console.log("set valores")
      this.form.patchValue(this._clienteService.item)
    }
  }

  onSubmit(event:Event){
    event.preventDefault
    if (this.form.valid) {
      if(this._clienteService.isUpdate){
        console.log("update")
        this.update()
      }else{
        this.new()
      }
    }else{
      this.form.markAllAsTouched()
    }
  }
  new(){
    console.log(this.form.value)
    this._clienteService.save(this.getNewCliente()).subscribe(
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
    this._clienteService.update(this.getCliente()).subscribe(
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
  getCliente(){
    let cliente;
    if(this.form.value.email&&this.form.value.domicilio&&this.form.value.telefono){
      //this.messageService.showMessage('danger','Ingrese email, domicilio y telefono!!')
      cliente={
        id:this._clienteService.item.id,
        nombre:this.form.value.nombre,
        cuit:this.form.value.cuit,
        email:this.form.value.email,
        domicilio:this.form.value.domicilio,
        telefono:this.form.value.telefono,
      }
    }else{
      cliente={id:this._clienteService.item.id,nombre:this.form.value.nombre,cuit:this.form.value.cuit}
    }
    return cliente;
  }
  getNewCliente(){
    let cliente;
    if(this.form.value.email&&this.form.value.domicilio&&this.form.value.telefono){
      cliente={
        nombre:this.form.value.nombre,
        cuit:this.form.value.cuit,
        email:this.form.value.email,
        domicilio:this.form.value.domicilio,
        telefono:this.form.value.telefono,
      }
    }else{
      cliente={nombre:this.form.value.nombre,cuit:this.form.value.cuit}
    }
    return cliente;
  }

}
