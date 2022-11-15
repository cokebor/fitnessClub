import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarcaModel } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  marcas:MarcaModel[]=[];
  paginador:any;

  constructor(private marcaService:MarcaService, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  obtenerMarcas(){
    this.activateRoute.paramMap.subscribe(params=>{
      let page:number=parseInt(params.get('page'));
      if(!page){
        page=0;
      }
    this.marcaService.getMarcas(page).subscribe(
      (response)=>{
        this.marcas=response.content as MarcaModel[];
        this.paginador=response;
      }
    );
  }
  );   
  }
  
  

  delete(marca:MarcaModel):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro que desea eliminar la Marca ${marca.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.delete(marca.idMarca).subscribe(
          response=>{
            this.marcas=this.marcas.filter(mar=>mar !== marca)
            swalWithBootstrapButtons.fire(
              'Marca Eliminada!',
              `Marca ${marca.nombre} eliminada con exito.`,
              'success'
            )    
          }
        )

      } 
    })
  }
}
