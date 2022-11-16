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
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { FormComponent } from './components/form/form.component';
import { DashUsuarioComponent } from './components/dash-usuario/dash-usuario.component';
import { ComprobantesUserComponent } from './components/comprobantes-user/comprobantes-user.component';


const routes: Routes = [
  {path:'',redirectTo:'principal', pathMatch:'full'},
  {path:'principal', component: PrincipalComponent},
  {path:'nosotros', component: NosotrosComponent},
  {path:'contacto', component: FormComponent},
  {path:'usuarios/form',component:FormUsuarioComponent},
  {path:'disciplinas',component:DisciplinasComponent},
  {path:'disciplinas/form',component:FormDisciplinaComponent},
  {path:'disciplinas/page/:page',component:DisciplinasComponent},
  {path:'disciplinas/form/:id',component:FormDisciplinaComponent},
  {path:'usuarios',component:UsuariosComponent},

  {path:'carrito',component:CarritoComponent},
  {path:'login',component:LoginComponent},
  {path:'comprobantes',component:ComprobantesComponent},
  {path:'comprobantes/page/:page',component:ComprobantesComponent},
  {path:'comprobantes-user',component:ComprobantesUserComponent},
  {path:'dashboardAdmin',component:DashAdminComponent},
  {path:'dashboardUser',component:DashUsuarioComponent},
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
 
  {path:'usuarios/page/:page',component:UsuariosComponent},
  
  {path:'usuarios/form/:id',component:FormUsuarioComponent},
  {path:'rubros',component:RubrosComponent},
  {path:'rubros/page/:page',component:RubrosComponent},
  {path:'rubros/form',component:FormRubroComponent},
  {path:'rubros/form/:id',component:FormRubroComponent}
 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
