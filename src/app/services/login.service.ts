import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  URL =  GlobalConstants.apiURL + "usuario/";
  key:any = null;
  constructor(private http:HttpClient) { }
  getUsuario(email:string, password:string){
    return this.http.get(`${this.URL}getusuario.php?email=${email}&pwd=${password}`);
  }
  getUsuarioLogueado(){
    this.key = localStorage.getItem('key');
    let user = JSON.parse(this.key);
    //console.log(user)
    return user;
  }  
}
