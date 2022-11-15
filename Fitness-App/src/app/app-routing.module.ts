import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './components/carrito/carrito.component';
import { ComprobantesComponent } from './components/comprobantes/comprobantes.component';
import { DashAdminComponent } from './components/dash-admin/dash-admin.component';
import { DetalleProductoComponent } from './components/form-detalle-producto/form-detalle-producto.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { FormDisciplinaComponent } from './components/form-disciplina/form-disciplina.component';
import { FormMarcaComponent } from './components/form-marca/form-marca.component';
import { FormProductoComponent } from './components/form-producto/form-producto.component';
import { FormRubroComponent } from './components/form-rubro/form-rubro.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RubrosComponent } from './components/rubros/rubros.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  {path:'',redirectTo:'/', pathMatch:'full'},
  {path:'carrito',component:CarritoComponent},
  {path:'comprobantes',component:ComprobantesComponent},
  {path:'comprobantes/page/:page',component:ComprobantesComponent},
  {path:'dashboardAdmin',component:DashAdminComponent},
  {path:'marcas',component:MarcasComponent},
  {path:'marcas/page/:page',component:MarcasComponent},
  {path:'marcas/form',component:FormMarcaComponent},
  {path:'marcas/form/:id',component:FormMarcaComponent},
  {path:'productos',component:ProductosComponent},
  {path:'productos/page/:page',component:ProductosComponent},
  {path:'productos/form',component:FormProductoComponent},
  {path:'productos/form/:id',component:FormProductoComponent},
  {path:'tienda',component:TiendaComponent},
  {path:'tienda/page/:page',component:TiendaComponent},
  {path:'usuarios',component:UsuariosComponent},
  {path:'usuarios/page/:page',component:UsuariosComponent},
  {path:'usuarios/form',component:FormUsuarioComponent},
  {path:'usuarios/form/:id',component:FormUsuarioComponent},
  {path:'rubros',component:RubrosComponent},
  {path:'rubros/page/:page',component:RubrosComponent},
  {path:'rubros/form',component:FormRubroComponent},
  {path:'rubros/form/:id',component:FormRubroComponent},
  {path:'disciplinas',component:DisciplinasComponent},
  {path:'disciplinas/page/:page',component:DisciplinasComponent},
  {path:'disciplinas/form',component:FormDisciplinaComponent},
  {path:'disciplinas/form/:id',component:FormDisciplinaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
