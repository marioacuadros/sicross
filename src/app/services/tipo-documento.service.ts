import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  URL =  GlobalConstants.apiURL + "tipo_documento/";
  constructor(private http:HttpClient) { }
  listTipoDocumento() {
    return this.http.get(`${this.URL}list.php`);
  }
}
