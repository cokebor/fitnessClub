import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RubroModel } from 'src/app/models/rubro.model';
import { RubroService } from 'src/app/services/rubro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rubros',
  templateUrl: './rubros.component.html',
  styleUrls: ['./rubros.component.css']
})
export class RubrosComponent implements OnInit {

  rubros:RubroModel[]=[];
  paginador:any;

  constructor(private rubroService:RubroService, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerRubros();
  }
  obtenerRubros(){
    this.activateRoute.paramMap.subscribe(params=>{
      let page:number=parseInt(params.get('page'));
      if(!page){
        page=0;
      }
    this.rubroService.getRubros(page).subscribe(
      (response)=>{
        this.rubros=response.content as RubroModel[];
        this.paginador=response;}
    );
  }
  );  
  }
  
  

  
  delete(rubro:RubroModel):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro que desea eliminar el Rubro ${rubro.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.rubroService.delete(rubro.idRubro).subscribe(
          response=>{
            this.rubros=this.rubros.filter(rub=>rub !== rubro)
            swalWithBootstrapButtons.fire(
              'Rubro Eliminado!',
              `Rubro ${rubro.nombre} eliminado con exito.`,
              'success'
            )    
          }
        )

      } 
    })
  }
}
