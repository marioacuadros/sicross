import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Administradora } from 'src/app/models/administradora'
import { EmpresaAdministradoraService } from 'src/app/services/empresa-administradora.service'
import { TipoAdministradoraService } from 'src/app/services/tipo-administradora.service'

@Component({
  selector: 'app-empresa-administradora',
  templateUrl: './empresa-administradora.component.html',
  styleUrls: ['./empresa-administradora.component.css']
})
export class EmpresaAdministradoraComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private empresaService: EmpresaAdministradoraService,
              private tipoAdministradora: TipoAdministradoraService,
              ) 
    { 
      this.addForm = this.frmBuilder.group({
        idTipo: ['', Validators.required],
        nombre:['', Validators.required],
        urlEmpresa: [],
      });
      this.filterForm = this.frmBuilder.group({
        palabraBuscar:[]
      })
    }

    empresas:any=null
    municipios:any=null
    departamentos:any=null
    modoEdicion : boolean = false
    idDepartamento : number = 0
    palabraBuscar:string=''
    tipos:any=null


    //Objeti empresa
    empresa:Administradora ={
      id:0,
      nombre: '',
      urlEmpresa: '',
      idTipo: 0,
      activo:0,
      tipo:''
    }

    ngOnInit(): void {
      this.listTipoEmpresa()
      this.listEmpresa()
    }

    changeState(empresa:Administradora){
      this.empresaService.changeState(empresa).subscribe(
        data => {
          this.listEmpresa();
        }
      );
    }

    getEmpresa(empresa:Administradora)
    {
      //console.log(empresa)
      this.modoEdicion = true;
      this.empresa = empresa;
      this.listTipoEmpresa()
    }

    delEmpresa(empresa:Administradora){
      if(confirm('Realmente desea elimnar el registro?')){
        this.empresaService.delEmpresa(empresa).subscribe(
          data => {
            this.listEmpresa();
          }
        );
      }  
    }
    addEmpresa(){
      this.empresaService.createEmpresa(this.empresa).subscribe(
        data => {
          this.resetEmpresa();
          this.listEmpresa();
        }
      );
    }
    
    updateEmpresa()
    {
      this.empresaService.updateEmpresa(this.empresa).subscribe(
        data => {
          this.resetEmpresa();
          this.listEmpresa();
        }
      )
    }
    listEmpresa(){
      this.empresaService.listEmpresa().subscribe(
        result => {
            this.empresas = result;
        }
      );
    }

    resetEmpresa(){
      this.empresa.id=0
      this.empresa.nombre= ''
      this.empresa.urlEmpresa= ''
      this.empresa.idTipo=0
      this.empresa.activo=0
      this.empresa.tipo=''    
    }
    
    searchEmpresa(){
      this.empresas = null
      this.empresaService.search(this.palabraBuscar).subscribe(
      (result:any) => {
        if(result != null)  
          this.empresas = result;
        this.palabraBuscar = ''
      });
    }

    listTipoEmpresa(){
      this.tipoAdministradora.listTipoAdministradora().subscribe(
        result => {
            this.tipos = result;
        }
      );
    }

}
