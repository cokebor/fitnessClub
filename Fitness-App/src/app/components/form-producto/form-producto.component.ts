import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisciplinaModel } from 'src/app/models/disciplina.model';
import { MarcaModel } from 'src/app/models/marca.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { RubroModel } from 'src/app/models/rubro.model';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProductoService } from 'src/app/services/producto.service';
import { RubroService } from 'src/app/services/rubro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  public titulo:string="Crear Producto";

  public producto:ProductoModel=new ProductoModel();

  public rubros:RubroModel[];
  public disciplinas:DisciplinaModel[];
  public marcas:MarcaModel[];

  private fotoSeleccionada:File;

  constructor(private rubroService:RubroService, private disciplinaService:DisciplinaService, private marcaService:MarcaService, private productoService:ProductoService
    , private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerRubros();
    this.obtenerDisciplinas();
    this.obtenerMarcas();
    this.cargarProducto();
  }

  obtenerRubros(){
    this.rubroService.getRubrosCombo().subscribe(
      (rubros)=>{
        this.rubros=rubros;
      }
    )
  }

  obtenerMarcas(){
    this.marcaService.getMarcasCombo().subscribe(
      (marcas)=>{
        this.marcas=marcas;
      }
    )
  }

  obtenerDisciplinas(){
    this.disciplinaService.getDisciplinasCombo().subscribe(
      (disciplinas)=>{
        this.disciplinas=disciplinas;
      }
    )
  }

  cargarProducto(){
    this.activatedRoute.params.subscribe(params=>{
      let id=params['id']
      if(id){
        this.productoService.getProducto(id).subscribe(
          producto=>{this.producto=producto;
            console.log(producto)
          }
        )
      }
    })
  }
  


  guardar():void{
   
    this.productoService.guardar(this.producto).subscribe(
      producto=>{
        console.log(producto)
        this.router.navigate(['/productos']);
        Swal.fire('Nuevo Producto', `El producto ${producto.descripcion} ha sido creado con exito`,'success')
      }
    )
  }



seleccionarFoto(event:any){
  this.fotoSeleccionada=event.target.files[0];
  console.log(this.fotoSeleccionada);
}

  update():void{
    this.productoService.update(this.producto).subscribe(
      json=>{
        this.router.navigate(['/productos']);
        Swal.fire('Producto Actualizado', `${json.mensaje}: ${json.producto.descripcion}`,'success')
      }
    )
  }
  
  compararRubro(r1:RubroModel,r2:RubroModel):boolean{
    if(r1===undefined && r2===undefined){
      return true;
    }
    return r1===null || r2===null || r1===undefined || r2===undefined?false:r1.idRubro==r2.idRubro;
  }

  compararDisciplina(d1:DisciplinaModel,d2:DisciplinaModel):boolean{
    if(d1===undefined && d2===undefined){
      return true;
    }
    return d1===null || d2===null || d1===undefined || d2===undefined?false:d1.idDisciplina==d2.idDisciplina;
  }

  
  compararMarca(m1:MarcaModel,m2:MarcaModel):boolean{
    if(m1===undefined && m2===undefined){
      return true;
    }
    return m1===null || m2===null || m1===undefined || m2===undefined?false:m1.idMarca==m2.idMarca;
  }
}
