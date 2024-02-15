import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { HomeComponent } from './components/home/home.component';
import { NoFoundComponent } from './components/no-found/no-found.component';
import { PersonaComponent } from './components/persona/persona.component';
import { EmpresaPersonaComponent } from './components/empresa-persona/empresa-persona.component';
import { CargarEmpleadoComponent } from './components/cargar-empleado/cargar-empleado.component';
import { EmpresaAdministradoraComponent } from './components/empresa-administradora/empresa-administradora.component';
import { AfiliacionComponent } from './components/afiliacion/afiliacion.component';
import { CotizadorComponent } from './components/cotizador/cotizador.component';
import { LiquidadorComponent } from './components/liquidador/liquidador.component';
import { CobroEmpresaComponent } from './components/cobro-empresa/cobro-empresa.component';
import { LoginComponent } from './components/login/login.component';
import { CuentaCobroComponent } from './components/cuenta-cobro/cuenta-cobro.component';
import { CajaComponent } from './components/caja/caja.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    EmpresaComponent,
    HomeComponent,
    NoFoundComponent,
    PersonaComponent,
    EmpresaPersonaComponent,
    CargarEmpleadoComponent,
    EmpresaAdministradoraComponent,
    AfiliacionComponent,
    CotizadorComponent,
    LiquidadorComponent,
    CobroEmpresaComponent,
    LoginComponent,
    CuentaCobroComponent,
    CajaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
