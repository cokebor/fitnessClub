import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProvinciaModel } from '../models/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private urlEndPoint:string='http://localhost:8080/api/provincias'

  constructor(private http:HttpClient) {
   }

   getProvinciasPorPais(idPais:number):Observable<ProvinciaModel[]>{
    return this.http.get<ProvinciaModel[]>(`${this.urlEndPoint}/${idPais}`);
   }
}
