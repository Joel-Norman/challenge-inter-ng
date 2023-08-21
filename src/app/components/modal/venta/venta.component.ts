import { Component, Input } from '@angular/core';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'modal-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {
  @Input() modal:any;

  dataTable=[]

  constructor(
    public _ventaService:VentaService
  ){

  }
}
