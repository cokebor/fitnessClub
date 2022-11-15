import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalidadModel } from '../models/localidad.model';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {


  private urlEndPoint:string='http://localhost:8080/api/localidades'

  constructor(private http:HttpClient) {
   }

   getLocalidadesPorProvincia(idProvincia:number):Observable<LocalidadModel[]>{
    return this.http.get<LocalidadModel[]>(`${this.urlEndPoint}/${idProvincia}`);
   }
  
}
