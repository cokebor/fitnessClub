import { DatePipe, formatDate, registerLocaleData } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ComprobanteModel } from '../models/comprobante.model';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  private urlEndPoint:string='http://localhost:8080/api/comprobantes'

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  getComprobantes(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map((response:any)=>{
        (response.content as ComprobanteModel[]).map(
          comprobante=>{
            return comprobante;
          }
        );
        return response;
      })
    );
  }

  guardar(comrprobante:ComprobanteModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,comrprobante,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.comprobante as ComprobanteModel),
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

  getComprobante(idComprobante:number):Observable<ComprobanteModel>{
    return this.http.get<ComprobanteModel>(`${this.urlEndPoint}/${idComprobante}`).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
