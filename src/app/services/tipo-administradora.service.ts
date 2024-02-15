import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class TipoAdministradoraService {
  URL =  GlobalConstants.apiURL + "tipo_administradora/";
  constructor(private http:HttpClient) { }
  listTipoAdministradora() {
    return this.http.get(`${this.URL}list.php`);
  }
}
