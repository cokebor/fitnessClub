import { Component, OnInit } from '@angular/core';
import { ItemComprobanteModel } from 'src/app/models/itemComprobante.model';
import { ItemComprobanteService } from 'src/app/services/item-comprobante.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  items!:ItemComprobanteModel[];

  constructor(private itemService:ItemComprobanteService) { }

  ngOnInit(): void {
  }


  calcularTotal():number{
    let total:number=0;
    this.items.forEach(
      item=>{
        total=total+(item.subTotal());
      }
    )
    return total;
  }
}
