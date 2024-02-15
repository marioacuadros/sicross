import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { Administradora } from 'src/app/models/administradora'

@Injectable({
  providedIn: 'root'
})
export class EmpresaAdministradoraService {
  URL =  GlobalConstants.apiURL + "empresa_administradora/";
  constructor(private http:HttpClient) { }
  listEmpresa() {
    return this.http.get(`${this.URL}list.php`);
  }
  createEmpresa(empresa: Administradora) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(empresa));
  }
  delEmpresa(empresa: Administradora) {
    return this.http.get(`${this.URL}del.php?id=${empresa.id}`);
  }
  updateEmpresa(empresa: Administradora) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(empresa));
  }
  changeState(empresa: Administradora) {
    return this.http.get(`${this.URL}change_state.php?id=${empresa.id}`);
  }
  search(key:string) {
    return this.http.get(`${this.URL}search.php?key=${key}`);
  }
  listByTipo(id:number) {
    return this.http.get(`${this.URL}listbytipo.php?id=${id}`);
  }  
}
