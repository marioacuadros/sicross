import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  URL =  GlobalConstants.apiURL + "general/";
  meses:any
  constructor(private http:HttpClient) { }
}
