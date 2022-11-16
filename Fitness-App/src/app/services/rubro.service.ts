import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { RubroModel } from '../models/rubro.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  private urlEndPoint:string='http://localhost:8080/api/rubros'

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

  getRubrosCombo():Observable<RubroModel[]>{
    return this.http.get<RubroModel[]>(this.urlEndPoint,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getRubros(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        (response.content as RubroModel[]).map(
          rubro=>{
            return rubro;
          }
        );
        return response;
      }),      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }


  guardar(rubro:RubroModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,rubro,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>response.rubro as RubroModel),
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

  getRubro(idRubro:number):Observable<RubroModel>{
    return this.http.get<RubroModel>(`${this.urlEndPoint}/${idRubro}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/productos'])
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }
  
  update(rubro:RubroModel):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${rubro.idRubro}`,rubro,{headers:this.agregarAuthorizationHeader()}).pipe(
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

  delete(idRubro:number):Observable<RubroModel>{
    return this.http.delete<RubroModel>(`${this.urlEndPoint}/${idRubro}`,{headers:this.agregarAuthorizationHeader()}).pipe(
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
