import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisciplinaModel } from '../models/disciplina.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  private urlEndPoint:string='http://localhost:8080/api/disciplinas'

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});


  constructor(private http:HttpClient, private router:Router) { }

  getDisciplinasCombo():Observable<DisciplinaModel[]>{
    return this.http.get<DisciplinaModel[]>(this.urlEndPoint);
  }

  getDisciplinas(page:number):Observable<any>{
    return this.http.get<any>(this.urlEndPoint +'/page/'+page).pipe(
      map((response:any)=>{
        (response.content as DisciplinaModel[]).map(
          disciplina=>{
            return disciplina;
          }
        );
        return response;
      })
    );
  }

  guardar(disciplina:DisciplinaModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,disciplina,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.disciplina as DisciplinaModel),
      catchError(e=>{

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

  getDisciplina(idDisciplina:number):Observable<DisciplinaModel>{
    return this.http.get<DisciplinaModel>(`${this.urlEndPoint}/${idDisciplina}`).pipe(
      catchError(e=>{
        this.router.navigate(['/disciplinas'])
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }

  update(disciplina:DisciplinaModel):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${disciplina.idDisciplina}`,disciplina,{headers:this.httpHeaders}).pipe(
      catchError(e=>{

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

  delete(idDisciplina:number):Observable<DisciplinaModel>{
    return this.http.delete<DisciplinaModel>(`${this.urlEndPoint}/${idDisciplina}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
