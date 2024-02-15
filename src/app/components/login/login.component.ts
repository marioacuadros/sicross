import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string = '';
  password:string = '';
  loginForm:FormGroup;
  constructor(private router:Router,
              private loginService:LoginService,
              private frmBuilder: FormBuilder
    ) {
      localStorage.removeItem('key'); 
      this.loginForm = this.frmBuilder.group({
        email:['', Validators.required],
        password:['', Validators.required]
      })

    }
usuario:Usuario = {
    id:0,
    usuario:'',
    debe_cambiar:0,
    llave:'',
    id_rol:0,
    activo:1
  }
  ngOnInit(): void {
    //this.login()
  }
  logueado:any = null;
  login(){
    //console.log(this.usuario)
    this.loginService.getUsuario(this.email, this.password).subscribe(
      (result:any) =>{
        this.usuario = result[0];
        this.validar();
      } 
    );
  }

  validar(){
    if (this.usuario.id != null && this.usuario.id!= 0){
      localStorage.setItem('key', JSON.stringify(this.usuario))
      this.router.navigate(['home']);
      location.reload(); 
    }else{
      alert('Usuario o password incorrecto');
    }
  }

}
