import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PaisModel } from '../models/pais.model';
import { ProvinciaModel } from '../models/provincia.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlEndPoint:string='http://localhost:8080/api/paises'

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

  getPaises():Observable<PaisModel[]>{
    return this.http.get<PaisModel[]>(this.urlEndPoint,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
