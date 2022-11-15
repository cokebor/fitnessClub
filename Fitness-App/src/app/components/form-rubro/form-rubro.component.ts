import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RubroModel } from 'src/app/models/rubro.model';
import { RubroService } from 'src/app/services/rubro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-rubro',
  templateUrl: './form-rubro.component.html',
  styleUrls: ['./form-rubro.component.css']
})
export class FormRubroComponent implements OnInit {

  public titulo:string="Crear Rubro";

  public rubro:RubroModel=new RubroModel();

  constructor(private rubroService:RubroService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarRubro();
  }
  
  cargarRubro(){
    this.activatedRoute.params.subscribe(params=>{
      let id=params['id']
      if(id){
        this.rubroService.getRubro(id).subscribe(
          rubro=>this.rubro=rubro
        )
      }
    })
  }

  guardar():void{
    this.rubroService.guardar(this.rubro).subscribe(
      rubro=>{
        this.router.navigate(['/rubros']);
        Swal.fire('Nuevo Rubro', `El rubro ${rubro.nombre} ha sido creado con exito`,'success');
      }
    )
  }

  update():void{
    this.rubroService.update(this.rubro).subscribe(
      json=>{
        this.router.navigate(['/rubros']);
        Swal.fire('Rubro Actualizado', `${json.mensaje}: ${json.rubro.nombre}`,'success');
      }
    )
  }
}
