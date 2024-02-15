import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  URL =  GlobalConstants.apiURL + "municipio/";
  constructor(private http:HttpClient) { }
  listMunicipio(id:number) {
    return this.http.get(`${this.URL}list.php?id=${id}`);
  }

}
