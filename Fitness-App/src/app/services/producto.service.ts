import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductoModel } from '../models/producto.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint:string='http://localhost:8080/api/productos'

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
/*
  getProductos():Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(this.urlEndPoint);
  }
*/
  getProductos(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        (response.content as ProductoModel[]).map(
          producto=>{
            return producto;
          }
        );
        return response;
      }),catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

/*
  getProductosConStockYActivos():Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(this.urlEndPoint +'Activos');
  }
*/
  getProductosConStockYActivos(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint +'Activos/page/'+page,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>{
        (response.content as ProductoModel[]).map(
          producto=>{
            return producto;
          }
        );
        return response;
      }),
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  guardar(producto:ProductoModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,producto,{headers:this.agregarAuthorizationHeader()}).pipe(
      map((response:any)=>response.producto as ProductoModel),
      catchError(e=>{
        
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        if(e.status==400){
          return throwError(e);
        }
//        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }

/*
  guardar(producto:ProductoModel, archivo:File):Observable<ProductoModel>{
    let formData=new FormData();
    formData.append("archivo",archivo);
  
    return this.http.post<any>(this.urlEndPoint,{producto,formData}).pipe(
      map((response:any)=>response.producto as ProductoModel),
      catchError(e=>{
//        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
*/
  subirFoto(archivo:File, id):Observable<HttpEvent<{}>>{
    let formData=new FormData();
    formData.append("archivo",archivo);
    formData.append("id",id);
    
    let httpHeaders=new HttpHeaders();
    let token=this.authService.token;
    if(token!=null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }


    const req=new HttpRequest('POST',`${this.urlEndPoint}/upload`, formData,{
      reportProgress:true,
      headers:httpHeaders 
    });

    return this.http.request(req);
  }


    


  getProducto(idProducto:number):Observable<ProductoModel>{
    return this.http.get<ProductoModel>(`${this.urlEndPoint}/${idProducto}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if(e.status==400){
          return throwError(e);
        }
        this.router.navigate(['/productos'])
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }

  update(producto:ProductoModel):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${producto.idProducto}`,producto,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if(e.status==400){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
  
  delete(idProducto:number):Observable<ProductoModel>{
    return this.http.delete<ProductoModel>(`${this.urlEndPoint}/${idProducto}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
