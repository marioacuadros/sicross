import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service'
import { LoginService } from 'src/app/services/login.service'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private itemService: ItemService,
    private loginService:LoginService,
    private router:Router
    )
{ 
}
  padres:any = null;
  hijos:any = null;
  items:any = null;
  usuario:any = null;
  logueado:boolean=false;

  ngOnInit(): void {
    this.listPadres();
  }
  
  estaLogueado(){
    this.getLogueado();
    if(this.usuario!=null)
      return true;
    else
      return false;
  }
  listPadres(){
    this.getLogueado();
    //let id = this.usuario.id_rol;
    let id = 1;
      this.itemService.listItem().subscribe(
      result => {
          this.padres = result;
          this.hijos = result;
          this.router.navigate(['home']);
      }
    );
  }

  exit(){
    this.logueado = false;
    this.padres = null
    this.hijos = null
    this.usuario = null
    localStorage.removeItem("key");
    this.listPadres()
    this.router.navigate(['login']);
  }
  getLogueado(){
    let user = this.loginService.getUsuarioLogueado();
    if(user!=null)
      this.usuario = user;
  }
}
