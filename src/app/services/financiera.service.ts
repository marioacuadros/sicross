import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class FinancieraService {
  URL =  GlobalConstants.apiURL + "financiera/";
  constructor(private http:HttpClient) { }
  listCuenta(key:string, anio:number, mes:string)
  {
    return this.http.get(`${this.URL}list.php?mes=${mes}&anio=${anio}&key=${key}`);
  }
  prnCuenta(cuenta: any) {
    return this.http.post(`${this.URL}factura.php`, JSON.stringify(cuenta), { responseType: 'blob' });
  }
  listPagos(idFactura:number)
  {
    return this.http.get(`${this.URL}list_pago.php?idfactura=${idFactura}`);
  }
  addPago(pago: any) {
    return this.http.post(`${this.URL}add.php`, JSON.stringify(pago));
  }
  delPago(idPago:number)
  {
    return this.http.get(`${this.URL}del.php?id=${idPago}`);
  }
  prnPago(pago:any) {
    return this.http.post(`${this.URL}recibo.php`, JSON.stringify(pago), { responseType: 'blob' });
  }
  listPagosByFecha(fecha:string)
  {
    return this.http.get(`${this.URL}list_pagobyfecha.php?fecha=${fecha}`);
  }
  listSalidas(fecha:string)
  {
    return this.http.get(`${this.URL}list_salidabyfecha.php?fecha=${fecha}`);
  }
  listResumen(fecha:string)
  {
    return this.http.get(`${this.URL}resumen.php?fecha=${fecha}`);
  }
  addSalida(salida:any)
  {
    return this.http.post(`${this.URL}addsalida.php`, JSON.stringify(salida));
  }
  delSalida(id:number)
  {
    return this.http.get(`${this.URL}delsalida.php?id=${id}`);
  }
  delCotizacion(id:number)
  {
    return this.http.get(`${this.URL}delcotizacion.php?id=${id}`);
  }
  addEntrada(entrada:any)
  {
    return this.http.post(`${this.URL}addentrada.php`, JSON.stringify(entrada));
  }
  delEntrada(id:number)
  {
    return this.http.get(`${this.URL}delentrada.php?id=${id}`);
  }
  prnReciboEntrada(pago:any) {
    return this.http.post(`${this.URL}reciboentrada.php`, JSON.stringify(pago), { responseType: 'blob' });
  }

}
