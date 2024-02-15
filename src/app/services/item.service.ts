import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http:HttpClient) { }
  URL =  GlobalConstants.apiURL + "item/";
  listItem() {
    return this.http.get(`${this.URL}list.php`);
  }
}
