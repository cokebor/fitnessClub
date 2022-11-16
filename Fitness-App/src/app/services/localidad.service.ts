import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { LocalidadModel } from '../models/localidad.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {


  private urlEndPoint:string='http://localhost:8080/api/localidades'

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, private router:Router, private authService:AuthService) {
   }

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

   getLocalidadesPorProvincia(idProvincia:number):Observable<LocalidadModel[]>{
    return this.http.get<LocalidadModel[]>(`${this.urlEndPoint}/${idProvincia}`,{headers:this.agregarAuthorizationHeader()});
   }
  
}
