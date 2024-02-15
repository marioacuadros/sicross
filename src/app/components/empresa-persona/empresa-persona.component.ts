import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { EmpresaPersonaService } from 'src/app/services/empresa-persona.service'
import { EmpresaService } from 'src/app/services/empresa.service'
import { EmpresaPersona } from 'src/app/models/empresa-persona'

@Component({
  selector: 'app-empresa-persona',
  templateUrl: './empresa-persona.component.html',
  styleUrls: ['./empresa-persona.component.css']
})
export class EmpresaPersonaComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private empresaPersonaService: EmpresaPersonaService,
              private empresaService: EmpresaService
              ) 
    { 
      this.addForm = this.frmBuilder.group({
        idEmpresa: ['', Validators.required],
        cargo: ['', Validators.required],
        salario: ['', Validators.required],
      });
      this.filterForm = this.frmBuilder.group({
        palabraBuscar:[],
        idEmpresa:[]
      })
    }

    personas:any=null
    municipiosNacimiento:any=null
    municipiosResidencia:any=null
    tiposDocumento:any=null
    departamentos:any=null
    modoEdicion : boolean = false
    idDepartamentoNacimiento : number = 0
    idDepartamentoResidencia : number = 0
    palabraBuscar:string=''
    idEmpresa:string=''
    empresas:any=null
    empresaPersonas:any=null

    //Objeti persona
    empresaPersona:EmpresaPersona ={
      id:0,
      idEmpresa:'',
      idPersona:'',
      nombreEmpresa:'',
      nombrePersona:'',
      activo:1,
      cargo:'',
      salario: 0,
      direccion:'',
      celular:''
    }

    ngOnInit(): void {
      this.listEmpresa()
      this.listEmpresaPersona()
    }

    changeState(id:number){
      this.empresaPersonaService.changeState(id).subscribe(
        data => {
          this.listEmpresaPersona();
        }
      );
    }

    getEmpresaPersona(empresaPersona:EmpresaPersona)
    {
      this.modoEdicion = true
      this.empresaPersona = empresaPersona
      this.listEmpresaEmpleado(this.empresaPersona.idPersona)
    }

    delEmpresaPersona(empresaPersona:EmpresaPersona){
      if(confirm('Realmente desea elimnar el registro?')){
        this.empresaPersonaService.delEmpresaPersona(empresaPersona).subscribe(
          data => {
            this.listEmpresaEmpleado(empresaPersona.idPersona);
            this.listEmpresaPersona();
          }
        );
      }  
    }
    addEmpresaPersona(){
      //console.log(this.empresaPersona)
      this.empresaPersonaService.createEmpresaPersona(this.empresaPersona).subscribe(
        data => {
          this.listEmpresaEmpleado(this.empresaPersona.idPersona)
          this.resetPersona();
          this.listEmpresaPersona();
        }
      );
    }
    
    updatePersona()
    {
      this.empresaPersonaService.updatePersona(this.empresaPersona).subscribe(
        data => {
          this.resetPersona();
          this.listEmpresaPersona();
        }
      )
    }
    listEmpresaPersona(){
      this.empresaPersonaService.listEmpresaPersona().subscribe(
        result => {
            this.personas = result;
        }
      );
    }

    resetPersona(){
      this.empresaPersona.id=0
      this.empresaPersona.idEmpresa=''
      this.empresaPersona.idPersona=''
      this.empresaPersona.nombreEmpresa=''
      this.empresaPersona.nombrePersona=''
      this.empresaPersona.activo=1
      this.empresaPersona.cargo=''
      this.empresaPersona.salario=0
    }
    
    searchPersona(){
      this.personas = null
      this.empresaPersonaService.search(this.palabraBuscar).subscribe(
      (result:any) => {
        if(result != null)  
          this.personas = result;
          this.palabraBuscar = ''
      });
    }
    listEmpresa(){
      this.empresaService.listEmpresa().subscribe(
        result => {
            this.empresas = result;
        }
      );
    }
    listEmpresaEmpleado(idPersona:string){
      this.empresaPersonaService.listEmpresaEmpleado(idPersona).subscribe(
        result => {
            this.empresaPersonas = result;
        }
      );
    }
    listByEmpresa(idEmpresa:string){
      this.empresaPersonaService.listByEmpresa(idEmpresa).subscribe(
        result => {
            this.personas = result;
        }
      );
    }
}
