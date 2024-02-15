import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class LiquidadorService {
  URL =  GlobalConstants.apiURL + "liquidar/";
  constructor(private http:HttpClient) { }
  liquidar(idEmpresa:string, mes:string, anio:number){
    return this.http.get(`${this.URL}liquidar.php?idempresa=${idEmpresa}&mes=${mes}&anio=${anio}`);
  }
  listEmpleados(idEmpresa:string, mes:string, anio:number){
    return this.http.get(`${this.URL}list.php?idempresa=${idEmpresa}&mes=${mes}&anio=${anio}`);
  }
  delEmpleado(id: number) {
    return this.http.get(`${this.URL}del.php?id=${id}`);
  }
}
