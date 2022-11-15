import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/producto.model';
import { ModalService } from 'src/app/services/modal.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'detalle-producto',
  templateUrl: './form-detalle-producto.component.html',
  styleUrls: ['./form-detalle-producto.component.css'],
})
export class DetalleProductoComponent implements OnInit {
  titulo: string = 'Detalle del Producto';

  @Input() producto: ProductoModel;

  fotoSeleccionada: File;

  progreso:number;

  constructor(
    private productoService: ProductoService,
    public modalService:ModalService
  ) {}

  ngOnInit(): void {

  }
  
  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso=0;
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire(
        'Error seleccionar imagen: ',
        'El archivo debe ser de tipo imagen',
        'error'
      );
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.productoService
        .subirFoto(this.fotoSeleccionada, this.producto.idProducto)
        .subscribe((event) => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso=Math.round((event.loaded/event.total)*100);
          }else if(event.type === HttpEventType.Response){
            let response:any=event.body;
            this.producto=response.producto as ProductoModel;

            this.modalService.notificarUpload.emit(this.producto);
            Swal.fire(
              'La foto se ha subido completamente!',
              response.mensaje,
              'success'
            );
          }
          
        });
    }
  }

  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada=null;
    this.progreso=0;
  }
}
