import { DatePipe, formatDate, registerLocaleData } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ComprobanteModel } from '../models/comprobante.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  private urlEndPoint:string='http://localhost:8080/api/comprobantes'

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  

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

  getComprobantes(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        (response.content as ComprobanteModel[]).map(
          comprobante=>{
            return comprobante;
          }
        );
        return response;
      }),catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  guardar(comrprobante:ComprobanteModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,comrprobante,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>response.comprobante as ComprobanteModel),
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

  getComprobante(idComprobante:number):Observable<ComprobanteModel>{
    return this.http.get<ComprobanteModel>(`${this.urlEndPoint}/${idComprobante}`,{headers:this.agregarAuthorizationHeader()}).pipe(
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
