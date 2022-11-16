import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { ProvinciaModel } from '../models/provincia.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private urlEndPoint:string='http://localhost:8080/api/provincias'

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, private router:Router, private authService:AuthService) {
   }
   private isNoAutorizado(e):boolean{
    if(e.status==401 || e.status==403){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  private agregarAuthorizationHeader(){
    let token=this.authService.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer ' + token);
    }
    return this.httpHeaders;
  }

   getProvinciasPorPais(idPais:number):Observable<ProvinciaModel[]>{
    return this.http.get<ProvinciaModel[]>(`${this.urlEndPoint}/${idPais}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
   }
}
