import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { Afiliacion } from 'src/app/models/afiliacion'
import { Archivo } from 'src/app/models/archivo'

@Injectable({
  providedIn: 'root'
})
export class AfiliacionService {
  URL =  GlobalConstants.apiURL + "afiliacion/";
  constructor(private http:HttpClient) { }
  listAfiliacion() {
    return this.http.get(`${this.URL}list.php`);
  }
  listByEmpleado(idPersona:string, idEmpresa:string) {
    return this.http.get(`${this.URL}listbyempleado.php?idpersona=${idPersona}&idempresa=${idEmpresa}`);
  }
  listByEmpresa(id:string) {
    return this.http.get(`${this.URL}listbyempresa.php?id=${id}`);
  }
  createAfiliacion(afiliacion: Afiliacion) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(afiliacion));
  }
  delAfiliacion(id:number) {
    return this.http.get(`${this.URL}del.php?id=${id}`);
  }
  updateAfiliacion(afiliacion: Afiliacion) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(afiliacion));
  }
  changeState(id:number) {
    return this.http.get(`${this.URL}change_state.php?id=${id}`);
  }
  search(key:string) {
    return this.http.get(`${this.URL}search.php?key=${key}`);
  }
  cargarArchivo(archivo:Archivo) {
    return this.http.post(`${this.URL}load_document.php`, JSON.stringify(archivo));
  }

}
