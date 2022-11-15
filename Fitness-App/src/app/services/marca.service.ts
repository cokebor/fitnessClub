import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { MarcaModel } from '../models/marca.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private urlEndPoint:string='http://localhost:8080/api/marcas'

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, private router:Router) { }

  getMarcasCombo():Observable<MarcaModel[]>{
    return this.http.get<MarcaModel[]>(this.urlEndPoint);
  }

  getMarcas(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map((response:any)=>{
        (response.content as MarcaModel[]).map(
          marca=>{
            return marca;
          }
        );
        return response;
      })
    );
  }


  guardar(marca:MarcaModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,marca,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.marca as MarcaModel),
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
  
  getMarca(idMarca:number):Observable<MarcaModel>{
    return this.http.get<MarcaModel>(`${this.urlEndPoint}/${idMarca}`).pipe(
      catchError(e=>{
        this.router.navigate(['/marcas'])
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }

  update(marca:MarcaModel):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${marca.idMarca}`,marca,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
  
  delete(idMarca:number):Observable<MarcaModel>{
    return this.http.delete<MarcaModel>(`${this.urlEndPoint}/${idMarca}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
