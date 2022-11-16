import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisciplinaModel } from '../models/disciplina.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  private urlEndPoint:string='http://localhost:8080/api/disciplinas'

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});


  constructor(private http:HttpClient, private router:Router, private authService:AuthService) { }

  private isNoAutorizado(e):boolean{
    //Error 401 es no autorizado y 403 es recurso prohibido 
    if(e.status==401 || e.status==403){
      /*if(this.authService.isAuthenticated()){
        this.authService.logout();
      }*/
      this.router.navigate(['/login']);
      return true;
    }
    /*if(e.status==403){
      Swal.fire('Acceso denegado', `${this.authService.usuario.apellido}, ${this.authService.usuario.nombre} no tiene acceso a este recurso`,'warning')
     
      return true;
    }*/
    return false;
    
  }

  private agregarAuthorizationHeader(){
    let token=this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }

  getDisciplinasCombo():Observable<DisciplinaModel[]>{
    return this.http.get<DisciplinaModel[]>(this.urlEndPoint,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getDisciplinas(page:number):Observable<any>{
    return this.http.get<any>(this.urlEndPoint +'/page/'+page,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        (response.content as DisciplinaModel[]).map(
          disciplina=>{
            return disciplina;
          }
        );
        return response;
      }),catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  guardar(disciplina:DisciplinaModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,disciplina,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.disciplina as DisciplinaModel),
      catchError(e=>{
  
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

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

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
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

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

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

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
