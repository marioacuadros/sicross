import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { Persona } from 'src/app/models/persona'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL =  GlobalConstants.apiURL + "persona/";
  constructor(private http:HttpClient) { }
  listPersona() {
    return this.http.get(`${this.URL}list.php`);
  }
  createPersona(persona: Persona) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(persona));
  }
  delPersona(persona: Persona) {
    return this.http.get(`${this.URL}del.php?id=${persona.identificacion}`);
  }
  updatePersona(persona: Persona) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(persona));
  }
  changeState(persona: Persona) {
    return this.http.get(`${this.URL}change_state.php?id=${persona.identificacion}`);
  }
  search(key:string) {
    return this.http.get(`${this.URL}search.php?key=${key}`);
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
  liquidar(idPersona:string, mes:string, anio:number){
    return this.http.get(`${this.URL}liquidar.php?idpersona=${idPersona}&mes=${mes}&anio=${anio}`);
  }
}
