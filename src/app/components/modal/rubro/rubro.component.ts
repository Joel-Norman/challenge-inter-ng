import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';
import { MessageService } from 'src/app/services/message.service';
import { RubroService } from 'src/app/services/rubro.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'modal-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss']
})
export class RubroComponent implements OnInit {
  @Input() modal:any;

  form:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private _rubroService:RubroService,
    private _tokenService:TokenService,
    public messageService:MessageService,
    private modalService: NgbModal,
  ) { 
    this.form=formBuilder.group({
      nombre:['',[Validators.required]],
      codigo:['',[Validators.required]],
    })
  }
  ngOnInit(): void {
    if(this._rubroService.item){
      console.log("set valores")
      this.form.patchValue(this._rubroService.item)
    }
  }

  onSubmit(event:Event){
    event.preventDefault
    if (this.form.valid) {
      if(this._rubroService.isUpdate){
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
    this._rubroService.save(this.form.value).subscribe(
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
    this._rubroService.update({id:this._rubroService.item.id,nombre:this.form.value.nombre,codigo:this.form.value.codigo}).subscribe(
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
}
