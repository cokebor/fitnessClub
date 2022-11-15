import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  productos:ProductoModel[]=[];
  paginador:any;

  constructor(private productoService:ProductoService, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerProductosConStockYActivos();
  }
  
  obtenerProductosConStockYActivos(){
    this.activateRoute.paramMap.subscribe(params=>{
      let page:number=parseInt(params.get('page'));
      if(!page){
        page=0;
      }
    this.productoService.getProductosConStockYActivos(page).subscribe(
      (response)=>{this.productos=response.content as ProductoModel[];
        this.paginador=response;}
    );
  }
  );  
  }

}
