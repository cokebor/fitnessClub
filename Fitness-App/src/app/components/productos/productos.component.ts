import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoModel } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos:ProductoModel[]=[];
  paginador:any;
  productoSeleccionado:ProductoModel;

  constructor(private productoService:ProductoService, private activateRoute:ActivatedRoute, private modalService:ModalService, public authService:AuthService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }
  obtenerProductos(){
    this.activateRoute.paramMap.subscribe(params=>{
      let page:number=parseInt(params.get('page'));
      if(!page){
        page=0;
      }
    this.productoService.getProductos(page).subscribe(
      (response)=>{
        this.productos=response.content as ProductoModel[];
        this.paginador=response;}
    );
  }
  );  
  this.modalService.notificarUpload.subscribe(
    producto=>{
      this.productos.map(productoOriginal=>{
        if(producto.idProducto==productoOriginal.idProducto){
          productoOriginal.imagen=producto.imagen;
        }
        return productoOriginal;
      })
    }
  )
  }

  //Metodo para mostrar Si es o no servicio
  esServicio(dato:boolean):string{
    if(dato==true){
      return 'Si';
    }
    return 'No';
  }

//Metodo para mostrar Si esta activo o Deshablitado
  estado(dato:boolean):string{
    if(dato==true){
      return 'Activo';
    }
    return 'Deshablitado';
  }

  delete(producto:ProductoModel):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro que desea eliminar el Producto ${producto.descripcion}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(producto.idProducto).subscribe(
          response=>{
            this.productos=this.productos.filter(pro=>pro !== producto)
            swalWithBootstrapButtons.fire(
              'Producto Eliminado!',
              `Producto ${producto.descripcion} eliminado con exito.`,
              'success'
            )    
          }
        )

      } 
    })
  }

  abrirModal(producto:ProductoModel){
    this.productoSeleccionado=producto;
    this.modalService.abrirModal();
  }
}
