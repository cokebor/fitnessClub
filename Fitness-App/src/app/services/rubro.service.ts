import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { RubroModel } from '../models/rubro.model';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  private urlEndPoint:string='http://localhost:8080/api/rubros'

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, private router:Router) { }

  getRubrosCombo():Observable<RubroModel[]>{
    return this.http.get<RubroModel[]>(this.urlEndPoint);
  }

  getRubros(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map((response:any)=>{
        (response.content as RubroModel[]).map(
          rubro=>{
            return rubro;
          }
        );
        return response;
      })
    );
  }


  guardar(rubro:RubroModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,rubro,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.rubro as RubroModel),
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

  getRubro(idRubro:number):Observable<RubroModel>{
    return this.http.get<RubroModel>(`${this.urlEndPoint}/${idRubro}`).pipe(
      catchError(e=>{
        this.router.navigate(['/productos'])
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }
  
  update(rubro:RubroModel):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${rubro.idRubro}`,rubro,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

  delete(idRubro:number):Observable<RubroModel>{
    return this.http.delete<RubroModel>(`${this.urlEndPoint}/${idRubro}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
