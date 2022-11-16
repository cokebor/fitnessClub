import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlEndPoint: string = 'http://localhost:8080/api/usuarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private isNoAutorizado(e): boolean {
    //Error 401 es no autorizado y 403 es recurso prohibido
    if (e.status == 401 || e.status == 403) {
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

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }
  /*
  getUsuarios():Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(this.urlEndPoint);
  }

  getUsuarios(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map((response:any)=>{
        (response.content as UsuarioModel[]).map(
          usuario=>{
            return usuario;
          }
        );
        return response;
      }),catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
*/
  getUsuarios(page: number): Observable<any> {
    return this.http
      .get(this.urlEndPoint + '/page/' + page, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        map((response: any) => {
          (response.content as UsuarioModel[]).map((us) => {
            return us;
          });
          return response;
        }),catchError(e=>{
          this.isNoAutorizado(e);
          return throwError(e);
        })
      );
  }



  guardar(usuario: UsuarioModel): Observable<any> {
    return this.http
      .post<any>(this.urlEndPoint, usuario, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        map((response: any) => response.usuario as UsuarioModel),
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  getUsuario(idUsuario: number): Observable<UsuarioModel> {
    return this.http
      .get<UsuarioModel>(`${this.urlEndPoint}/${idUsuario}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (this.authService.hasRole('ROLE_ADMIN')) {
            this.router.navigate(['/usuarios']);
          } else {
            this.router.navigate(['/tienda']);
          }
          console.error(e.error.mensaje);
          Swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
  }

  subirFoto(archivo: File, idUsuario): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', idUsuario);

    //let httpHeaders=new HttpHeaders();
    // let token=this.authService.token;
    //if(token!=null){
    //   httpHeaders=httpHeaders.append('Authorization', 'Bearer' + token);
    // }

    const req = new HttpRequest(
      'POST',
      `${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
        // headers:httpHeaders
      }
    );

    return this.http.request(req).pipe(
      catchError((e) => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  update(usuario: UsuarioModel): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${usuario.idUsuario}`, usuario, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  delete(idUsuario: number): Observable<UsuarioModel> {
    return this.http
      .delete<UsuarioModel>(`${this.urlEndPoint}/${idUsuario}`, {
        headers: this.agregarAuthorizationHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
