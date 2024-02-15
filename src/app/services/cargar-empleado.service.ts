import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Archivo } from 'src/app/models/archivo'

@Injectable({
  providedIn: 'root'
})
export class CargarEmpleadoService {
  URL =  GlobalConstants.apiURL + "afiliacion/";
  constructor(private http:HttpClient) { }

  cargarEmpleado(archivo:Archivo) {
    return this.http.post(`${this.URL}load_file.php`, JSON.stringify(archivo));
  }
}
