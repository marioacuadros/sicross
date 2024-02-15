import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { NoFoundComponent } from './components/no-found/no-found.component'
import { EmpresaComponent } from './components/empresa/empresa.component'
import { PersonaComponent } from './components/persona/persona.component'
import { EmpresaPersonaComponent } from './components/empresa-persona/empresa-persona.component'
import { CargarEmpleadoComponent } from './components/cargar-empleado/cargar-empleado.component'
import { EmpresaAdministradoraComponent } from './components/empresa-administradora/empresa-administradora.component'
import { AfiliacionComponent } from './components/afiliacion/afiliacion.component'
import { CotizadorComponent } from './components/cotizador/cotizador.component'
import { LiquidadorComponent } from './components/liquidador/liquidador.component'
import { CobroEmpresaComponent } from './components/cobro-empresa/cobro-empresa.component'
import { LoginComponent } from './components/login/login.component'
import { CuentaCobroComponent } from './components/cuenta-cobro/cuenta-cobro.component'
import { CajaComponent } from './components/caja/caja.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'empresa', component: EmpresaComponent},
  {path: 'persona', component: PersonaComponent},
  {path: 'empresaPersona', component: EmpresaPersonaComponent},
  {path: 'cargarEmpleado', component: CargarEmpleadoComponent}, 
  {path: 'empresaAdministradora', component: EmpresaAdministradoraComponent}, 
  {path: 'afiliacion', component: AfiliacionComponent}, 
  {path: 'cotizador', component: CotizadorComponent},  
  {path: 'liquidador', component: LiquidadorComponent},
  {path: 'cobroEmpresa', component: CobroEmpresaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cuentaCobro', component: CuentaCobroComponent},
  {path: 'caja', component: CajaComponent},
  {path:'**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
