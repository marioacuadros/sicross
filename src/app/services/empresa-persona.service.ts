import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { EmpresaPersona } from 'src/app/models/empresa-persona'

@Injectable({
  providedIn: 'root'
})
export class EmpresaPersonaService {
  URL =  GlobalConstants.apiURL + "empresa_persona/";
  constructor(private http:HttpClient) { }
  listEmpresaPersona() {
    return this.http.get(`${this.URL}list.php`);
  }
  listEmpresaEmpleado(id:string) {
    return this.http.get(`${this.URL}listbyempleado.php?id=${id}`);
  }
  listByEmpresa(id:string) {
    return this.http.get(`${this.URL}listbyempresa.php?id=${id}`);
  }
  createEmpresaPersona(empresaPersona: EmpresaPersona) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(empresaPersona));
  }
  delEmpresaPersona(empresaPersona: EmpresaPersona) {
    return this.http.get(`${this.URL}del.php?id=${empresaPersona.id}`);
  }
  updatePersona(empresaPersona: EmpresaPersona) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(empresaPersona));
  }
  changeState(id:number) {
    return this.http.get(`${this.URL}change_state.php?id=${id}`);
  }
  search(key:string) {
    return this.http.get(`${this.URL}search.php?key=${key}`);
  }

}
