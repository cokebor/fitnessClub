import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolModel } from 'src/app/models/rol.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:UsuarioModel[]=[];
  paginador:any;
  usuarioSeleccionado:UsuarioModel;
  titulo:string='Gestion de Usuarios'

  constructor(private usuarioService:UsuarioService, private activateRoute:ActivatedRoute, private modalService:ModalService, public autService:AuthService) { }

  ngOnInit(): void {
      this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.activateRoute.paramMap.subscribe(params=>{
      let page:number=parseInt(params.get('page'));
      if(!page){
        page=0;
      }
    this.usuarioService.getUsuarios(page).subscribe(
      (response)=>{this.usuarios=response.content as UsuarioModel[];
        this.paginador=response;}
    );
  }
  );  
  this.modalService.notificarUpload.subscribe(
    usuario=>{
      this.usuarios.map(usuarioOriginal=>{
        if(usuario.idUsuario==usuarioOriginal.idUsuario){
          usuarioOriginal.imagen=usuario.imagen;
        }
        return usuarioOriginal;
      })
    }
  )
  }

  

  
  delete(usuario:UsuarioModel):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro que desea eliminar el Usuario de ${usuario.apellido}, ${usuario.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(usuario.idUsuario).subscribe(
          response=>{
            this.usuarios=this.usuarios.filter(us=>us !== usuario)
            swalWithBootstrapButtons.fire(
              'Usuario Eliminado!',
              `El Usuario de ${usuario.apellido}, ${usuario.nombre} fue eliminado con exito.`,
              'success'
            )    
          }
        )

      } 
    })
  }

  estado(dato:boolean):string{
    if(dato==true){
      return 'Activo';
    }
    return 'Deshablitado';
  }

  rol(rol:RolModel):string{
    if(rol.nombre=='ROLE_USER'){
      return 'Usuario';
    }
    return 'Administrador';
  }


  abrirModal(usuario:UsuarioModel){
    this.usuarioSeleccionado=usuario;
    this.modalService.abrirModal();
  }
}
