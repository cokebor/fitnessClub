import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { MarcaModel } from '../models/marca.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private urlEndPoint:string='http://localhost:8080/api/marcas'

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

  getMarcasCombo():Observable<MarcaModel[]>{
    return this.http.get<MarcaModel[]>(this.urlEndPoint,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  getMarcas(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        (response.content as MarcaModel[]).map(
          marca=>{
            return marca;
          }
        );
        return response;
      }),catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }


  guardar(marca:MarcaModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,marca,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>response.marca as MarcaModel),
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
  
  getMarca(idMarca:number):Observable<MarcaModel>{
    return this.http.get<MarcaModel>(`${this.urlEndPoint}/${idMarca}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/marcas'])
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }

  update(marca:MarcaModel):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${marca.idMarca}`,marca,{headers:this.agregarAuthorizationHeader()}).pipe(
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
  
  delete(idMarca:number):Observable<MarcaModel>{
    return this.http.delete<MarcaModel>(`${this.urlEndPoint}/${idMarca}`,{headers:this.agregarAuthorizationHeader()}).pipe(
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
