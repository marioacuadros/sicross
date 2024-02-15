import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class NivelRiesgoService {
  URL =  GlobalConstants.apiURL + "nivel_riesgo/";
  constructor(private http:HttpClient) { }
  listNivelRiesgo() {
    return this.http.get(`${this.URL}list.php`);
  }
}
