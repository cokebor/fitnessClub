import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.component.html',
  styleUrls: ['./menuprincipal.component.css']
})
export class MenuprincipalComponent implements OnInit {

  constructor(public authService:AuthService, private router:Router, private modalService:ModalService, private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }


  cerrarSesion():void{
    let nombreUsuario=this.authService.usuario.apellido + ', ' + this.authService.usuario.nombre;
    this.authService.logout();
    Swal.fire('Cerrar Sesion',`${nombreUsuario} ha cerrado sesion con exito!.`, 'success');
    this.router.navigate(['/login']);
  }

  mostrarDashboard() {
    document.getElementById("sidebar")!.style.width = "300px";
    document.getElementById("contenido")!.style.marginLeft = "300px";
}

usuarioSeleccionado:UsuarioModel;

abrirModal(usuario:UsuarioModel){
  console.log(usuario);
  this.usuarioService.getUsuario(usuario.idUsuario).subscribe(
    us=>{
      console.log(usuario);
      this.usuarioSeleccionado=us;
    }
  )
  this.modalService.abrirModal();
}
}
