import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'detalle-usuario',
  templateUrl: './form-detalle-usuario.component.html',
  styleUrls: ['./form-detalle-usuario.component.css']
})
export class FormDetalleUsuarioComponent implements OnInit {

  titulo: string = 'Detalle del Usuario';

  @Input() usuario: UsuarioModel;

  fotoSeleccionada: File;

  progreso:number;

  constructor(
    private usuarioService: UsuarioService,
    public modalService:ModalService
  ) {}

  ngOnInit(): void {

  }
  
  seleccionarFoto(event) {
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
      this.usuarioService
        .subirFoto(this.fotoSeleccionada, this.usuario.idUsuario)
        .subscribe((event) => {
          if(event.type === HttpEventType.UploadProgress){
            this.progreso=Math.round((event.loaded/event.total)*100);
          }else if(event.type === HttpEventType.Response){
            let response:any=event.body;
            this.usuario=response.usuario as UsuarioModel;
            this.modalService.notificarUpload.emit(this.usuario);
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
  }
}
