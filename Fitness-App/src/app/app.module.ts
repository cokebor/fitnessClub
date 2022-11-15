import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashAdminComponent } from './components/dash-admin/dash-admin.component';
import { MenuprincipalComponent } from './components/menuprincipal/menuprincipal.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ComprobantesComponent } from './components/comprobantes/comprobantes.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import {HttpClientModule} from '@angular/common/http';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { RubrosComponent } from './components/rubros/rubros.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { FormProductoComponent } from './components/form-producto/form-producto.component';
import { FormMarcaComponent } from './components/form-marca/form-marca.component';
import { FormRubroComponent } from './components/form-rubro/form-rubro.component';
import { FormDisciplinaComponent } from './components/form-disciplina/form-disciplina.component'
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { DashUsuarioComponent } from './components/dash-usuario/dash-usuario.component';
import localeES from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';

registerLocaleData(localeES,'es');

@NgModule({
  declarations: [
    AppComponent,
    MenuprincipalComponent,
    DashAdminComponent,
    FooterComponent,
    UsuariosComponent,
    ProductosComponent,
    ComprobantesComponent,
    TiendaComponent,
    CarritoComponent,
    MarcasComponent,
    DisciplinasComponent,
    RubrosComponent,
    FormUsuarioComponent,
    FormProductoComponent,
    FormMarcaComponent,
    FormRubroComponent,
    FormDisciplinaComponent,
    DashUsuarioComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue:"es"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
