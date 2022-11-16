import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { LocalidadModel } from 'src/app/models/localidad.model';
import { PaisModel } from 'src/app/models/pais.model';
import { ProvinciaModel } from 'src/app/models/provincia.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { LocalidadService } from 'src/app/services/localidad.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  public titulo:string="Crear Usuario";

  public usuario:UsuarioModel=new UsuarioModel();

  public pais!:PaisModel;
  public provincia!:ProvinciaModel;

  paises!:PaisModel[];
  provincias:ProvinciaModel[]=[];
  localidades:LocalidadModel[]=[];

  constructor(private paisesService:PaisService,
    private provinciaService:ProvinciaService, 
    private localidadService:LocalidadService,
    private usuarioService:UsuarioService, 
    private router:Router,
    private activatedRoute:ActivatedRoute,
   ) { }

  ngOnInit(): void {
    this.obtenerPaises();
    this.cargarUsuario();
  }

  cargarUsuario(){
    this.activatedRoute.params.subscribe(params=>{
      let id=params['id']
      if(id){
        this.usuarioService.getUsuario(id).subscribe(
          usuario=>{
            this.usuario=usuario;
            this.pais=usuario.localidad.provincia.pais;
            this.obtenerProvincias();
            this.provincia=usuario.localidad.provincia;
            this.obtenerLocalidades();
            this.titulo="Editar Usuario";
            console.log(this.provincia)
          }
        )
      }
    })
  }

  obtenerPaises(){
    this.paisesService.getPaises().subscribe(
      paises=>{
        this.paises=paises; 
        });
  }

  obtenerProvincias(){
    if(this.pais!=undefined){
      this.provinciaService.getProvinciasPorPais(this.pais.idPais).subscribe(
        provincias=>{
          this.provincias=provincias;
        }
      )
    }else{
      this.provincias=[];
      this.localidades=[];
    }
  }
    
    obtenerLocalidades(){
      if(this.provincia!=undefined){
        this.localidadService.getLocalidadesPorProvincia(this.provincia.idProvincia).subscribe(
          (localidades)=>{
            this.localidades=localidades;
          }
        )
      }else{
        this.localidades=[];
      }
    
  }


  guardar(){
    this.usuarioService.guardar(this.usuario).subscribe(
      usuario=>{
        this.router.navigate(['/usuarios']);
        Swal.fire('Nuevo Usuario', `El usuario ${usuario.apellido}, ${usuario.nombre} ha sido creado con exito`,'success')
      }
    )
  }

  update():void{
    this.usuarioService.update(this.usuario).subscribe(
      json=>{
        this.router.navigate(['/usuarios']);
        Swal.fire('Usuario Actualizado', `${json.mensaje}: ${json.usuario.apellido}, ${json.usuario.nombre}`,'success')  
      }
    )
  }

  compararPais(p1:PaisModel,p2:PaisModel):boolean{
    
    if(p1===undefined && p2===undefined){
      return true;
    }
    return p1===null || p2===null || p1===undefined || p2===undefined?false:p1.idPais==p2.idPais;
  }

  compararProvincia(p1:ProvinciaModel,p2:ProvinciaModel):boolean{
    if(p1===undefined && p2===undefined){
      return true;
    }
    return p1===null || p2===null || p1===undefined || p2===undefined?false:p1.idProvincia==p2.idProvincia;
  }

  
  compararLocalidad(l1:LocalidadModel,l2:LocalidadModel):boolean{
    if(l1===undefined && l2===undefined){
      return true;
    }
    return l1===null || l2===null || l1===undefined || l2===undefined?false:l1.idLocalidad==l2.idLocalidad;
  }
}
