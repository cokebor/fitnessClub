import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PaisModel } from '../models/pais.model';
import { ProvinciaModel } from '../models/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlEndPoint:string='http://localhost:8080/api/paises'

  constructor(private http:HttpClient) { }

  getPaises():Observable<PaisModel[]>{
    return this.http.get<PaisModel[]>(this.urlEndPoint);
  }
}
