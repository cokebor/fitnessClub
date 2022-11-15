import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {

  disciplinas:DisciplinaModel[]=[];
  
  paginador:any;

  constructor(private disciplinaService:DisciplinaService, private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerDisciplinas();
  }

  obtenerDisciplinas(){
    
    this.activateRoute.paramMap.subscribe(params=>{
      let page:number=parseInt(params.get('page'));
      if(!page){
        page=0;
      }
      this.disciplinaService.getDisciplinas(page).subscribe(
        (response)=>{
          this.disciplinas=response.content as DisciplinaModel[];
          this.paginador=response;
        }
          
      ); 
    }
    );      
  }


  delete(disciplina:DisciplinaModel):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: `¿Seguro que desea eliminar la Disciplina ${disciplina.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.disciplinaService.delete(disciplina.idDisciplina).subscribe(
          response=>{
            this.disciplinas=this.disciplinas.filter(dis=>dis !== disciplina)
            swalWithBootstrapButtons.fire(
              'Disciplina Eliminada!',
              `Disciplina ${disciplina.nombre} eliminada con exito.`,
              'success'
            )    
          }
        )

      } 
    })
  }

}
