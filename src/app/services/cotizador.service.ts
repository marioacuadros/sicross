import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { Cotizador } from 'src/app/models/cotizador'

@Injectable({
  providedIn: 'root'
})
export class CotizadorService {
  URL =  GlobalConstants.apiURL + "cotizador/";
  constructor(private http:HttpClient) { }
  listCotizador() {
    return this.http.get(`${this.URL}list.php`);
  }
  createCotizador(cotizador: Cotizador) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(cotizador));
  }
  delCotizador(cotizador: Cotizador) {
    return this.http.get(`${this.URL}del.php?id=${cotizador.id}`);
  }
  updateCotizador(cotizador: Cotizador) {
    return this.http.post(`${this.URL}update.php`, JSON.stringify(cotizador));
  }
  changeState(cotizador: Cotizador) {
    return this.http.get(`${this.URL}change_state.php?id=${cotizador.id}`);
  }
  search(key:string) {
    return this.http.get(`${this.URL}search.php?key=${key}`);
  }
}
