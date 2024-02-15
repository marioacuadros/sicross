import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { Empresa } from 'src/app/models/empresa'


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  URL =  GlobalConstants.apiURL + "empresa/";
  constructor(private http:HttpClient) { }
  listEmpresa() {
    return this.http.get(`${this.URL}list.php`);
  }
  createEmpresa(empresa: Empresa) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(empresa));
  }
  delEmpresa(empresa: Empresa) {
    return this.http.get(`${this.URL}del.php?id=${empresa.numeroIdentificacion}`);
  }
  updateEmpresa(empresa: Empresa) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(empresa));
  }
  changeState(empresa: Empresa) {
    return this.http.get(`${this.URL}change_state.php?id=${empresa.numeroIdentificacion}`);
  }
  search(key:string) {
    return this.http.get(`${this.URL}search.php?key=${key}`);
  }
  listCobro(idEmpresa:string, anio:number, mes:string)
  {
    return this.http.get(`${this.URL}list_cobro.php?idempresa=${idEmpresa}&mes=${mes}&anio=${anio}`);
  }
  facturar(cobro: any) {
    return this.http.post(`${this.URL}facturar.php`, JSON.stringify(cobro));
  }
  getCuenta(cobro: any) {
    return this.http.post(`${this.URL}get_cuenta.php`, JSON.stringify(cobro));
  }
  prnCuenta(cuenta: any) {
    return this.http.post(`${this.URL}factura.php`, JSON.stringify(cuenta), { responseType: 'blob' });
  }
  listCuenta(idEmpresa:string, anio:number, mes:string)
  {
    return this.http.get(`${this.URL}list_cuenta.php?idempresa=${idEmpresa}&mes=${mes}&anio=${anio}`);
  }
  listBanco() {
    return this.http.get(`${this.URL}list_banco.php`);
  }
}
