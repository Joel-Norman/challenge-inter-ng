import { Component, Input } from '@angular/core';
import { ProductosService } from 'src/app/services/producto.service';

@Component({
  selector: 'cardproducto',
  templateUrl: './cardproducto.component.html',
  styleUrls: ['./cardproducto.component.scss']
})
export class CardproductoComponent {
  @Input() modal:any;
  constructor(
    public productoService:ProductosService
  ){

  }
}
