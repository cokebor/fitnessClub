import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaModel } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.component.html',
  styleUrls: ['./form-marca.component.css']
})
export class FormMarcaComponent implements OnInit {

  public titulo:string="Crear Marca";

  public marca:MarcaModel=new MarcaModel();

  constructor(private marcaService:MarcaService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarMarca();
  }

  public cargarMarca(){
    this.activatedRoute.params.subscribe(params=>{
      let id=params['id']
      if(id){
        this.marcaService.getMarca(id).subscribe(
          marca=>this.marca=marca
        )
      }
    })
  }

  guardar():void{
    this.marcaService.guardar(this.marca).subscribe(
      marca=>{
        this.router.navigate(['/marcas']);
        Swal.fire('Nueva Marca', `La marca ${marca.nombre} ha sido creada con exito`,'success')
      }
    )
  }

  update():void{
    this.marcaService.update(this.marca).subscribe(
      json=>{
        this.router.navigate(['/marcas']);
        Swal.fire('Marca Actualizada', `${json.mensaje}: ${json.marca.nombre}`,'success')
      }
    )
  }
}
