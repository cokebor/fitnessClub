import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-disciplina',
  templateUrl: './form-disciplina.component.html',
  styleUrls: ['./form-disciplina.component.css']
})
export class FormDisciplinaComponent implements OnInit {

  public titulo:string="Crear Disciplina";

  public disciplina:DisciplinaModel=new DisciplinaModel();

  public errores:string[];

  constructor(private disciplinaService:DisciplinaService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.cargarDisciplina();
  }

  cargarDisciplina():void{
    this.activatedRoute.params.subscribe(params=>{
      let id=params['id']
      console.log(id)
      if(id){
        this.disciplinaService.getDisciplina(id).subscribe(
          disciplina=>this.disciplina=disciplina
        )
      }
    })
  }

  guardar():void{
    this.disciplinaService.guardar(this.disciplina).subscribe(
      disciplina=>{
        this.router.navigate(['/disciplinas']);
        Swal.fire('Nueva disciplina', `La disciplina ${disciplina.nombre} ha sido creada con exito`,'success')
      },
      err=>{
        this.errores=err.error.errors as string[];
        console.log('Codigo de error: ' + err.status);
      }
    )
  }

  update():void{
    this.disciplinaService.update(this.disciplina).subscribe(
      json=>{
        this.router.navigate(['/disciplinas']);
        Swal.fire('Disciplina Actualizada', `${json.mensaje}: ${json.disciplina.nombre}`,'success')
      },
      err=>{
        this.errores=err.error.errors as string[];
        console.log('Codigo de error: ' + err.status);
      }
    )
  }

  }
