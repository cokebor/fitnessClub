import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
//import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  
  constructor(private authService:AuthService,private router:Router){
    this.usuario=new UsuarioModel();
  }
  /*constructor( private fb: FormBuilder, , ) { 
     this.ingresarLogin();

  }*/

  titulo:string='Login';
  usuario:UsuarioModel;


  ngOnInit() {
    if(this.authService.isAuthenticated()){
      Swal.fire('Login',`${this.authService.usuario.apellido}, ${this.authService.usuario.nombre} ya estas autenticado!`,'info');
      this.router.navigate(['/principal']);
    }
  }
  

  login(): void {
    if(this.usuario.email==null || this.usuario.password==null){
      Swal.fire('Error Login', 'Email o password vacias!','error');
      return;
    }
    this.authService.login(this.usuario).subscribe((response) => {
      console.log(response);
    
     this.authService.guardarUsuario(response.access_token);
     this.authService.guardarToken(response.access_token);

      let usuario = this.authService.usuario;

      this.router.navigate(['/principal']);
      Swal.fire('Login',`Bienvenido  ${usuario.apellido}, ${usuario.nombre} has iniciado sesion con exito`,
        'success'
      );
    },err=>{
      if(err.status==400){
        Swal.fire('Error Login', 'Usuario o claves incorrectas!', 'error');
      }
    });
  }

  /*get correoNoValido() {
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get passwordNoValido() {
    return this.forma.get('password').invalid && this.forma.get('password').touched
  }






  enviar() {
    console.log( this.forma );

    if ( this.forma.invalid ) {

      return Object.values( this.forma.controls ).forEach( control => {
        
        if ( control instanceof FormGroup ) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
        
        
      });
     
    }
    this.forma.reset({
      correo: '',
      password: '',

    });
  }*/
}


