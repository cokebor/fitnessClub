import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint:string='http://localhost:8080/api/usuarios' 

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, private router:Router) { }
/*
  getUsuarios():Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(this.urlEndPoint);
  }
*/
  getUsuarios(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map((response:any)=>{
        (response.content as UsuarioModel[]).map(
          usuario=>{
            return usuario;
          }
        );
        return response;
      })
    );
  }


  guardar(usuario:UsuarioModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,usuario,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.usuario as UsuarioModel),
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

  getUsuario(idUsuario:number):Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`${this.urlEndPoint}/${idUsuario}`).pipe(
      catchError(e=>{
        this.router.navigate(['/usuarios'])
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }

  subirFoto(archivo:File, idUsuario):Observable<HttpEvent<{}>>{
    let formData=new FormData();
    formData.append("archivo",archivo);
    formData.append("id",idUsuario);

    const req=new HttpRequest('POST',`${this.urlEndPoint}/upload`, formData,{
      reportProgress:true
    });

    return this.http.request(req);
  }

  update(usuario:UsuarioModel):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${usuario.idUsuario}`,usuario,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

  delete(idUsuario:number):Observable<UsuarioModel>{
    return this.http.delete<UsuarioModel>(`${this.urlEndPoint}/${idUsuario}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
