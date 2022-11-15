import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint:string='http://localhost:8080/api/productos'

  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, private router:Router) { }
/*
  getProductos():Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(this.urlEndPoint);
  }
*/
  getProductos(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/page/'+page).pipe(
      map((response:any)=>{
        (response.content as ProductoModel[]).map(
          producto=>{
            return producto;
          }
        );
        return response;
      })
    );
  }

/*
  getProductosConStockYActivos():Observable<ProductoModel[]>{
    return this.http.get<ProductoModel[]>(this.urlEndPoint +'Activos');
  }
*/
  getProductosConStockYActivos(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint +'Activos/page/'+page).pipe(
      map((response:any)=>{
        (response.content as ProductoModel[]).map(
          producto=>{
            return producto;
          }
        );
        return response;
      })
    );
  }

  guardar(producto:ProductoModel):Observable<any>{
    return this.http.post<any>(this.urlEndPoint,producto,{headers:this.httpHeaders}).pipe(
      map((response:any)=>response.producto as ProductoModel),
      catchError(e=>{
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
  subirFoto(archivo:File, idProducto):Observable<HttpEvent<{}>>{
    let formData=new FormData();
    formData.append("archivo",archivo);
    formData.append("id",idProducto);

    const req=new HttpRequest('POST',`${this.urlEndPoint}/upload`, formData,{
      reportProgress:true
    });

    return this.http.request(req);
  }

  getProducto(idProducto:number):Observable<ProductoModel>{
    return this.http.get<ProductoModel>(`${this.urlEndPoint}/${idProducto}`).pipe(
      catchError(e=>{
        this.router.navigate(['/productos'])
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje,'error');
        return throwError(e);
      })
    )
  }

  update(producto:ProductoModel):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${producto.idProducto}`,producto,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
  
  delete(idProducto:number):Observable<ProductoModel>{
    return this.http.delete<ProductoModel>(`${this.urlEndPoint}/${idProducto}`,{headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e);
      })
    );
  }
}
