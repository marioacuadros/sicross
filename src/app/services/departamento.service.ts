import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  URL =  GlobalConstants.apiURL + "departamento/";
  constructor(private http:HttpClient) { }
  listDepartamento() {
    return this.http.get(`${this.URL}list.php`);
  }

}
