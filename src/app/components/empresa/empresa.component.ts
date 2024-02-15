import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Empresa } from 'src/app/models/empresa'
import { MunicipioService } from  'src/app/services/municipio.service'
import { DepartamentoService } from 'src/app/services/departamento.service'
import { EmpresaService } from 'src/app/services/empresa.service'
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service'


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private municipioService: MunicipioService,
              private departamentoService: DepartamentoService,
              private empresaService: EmpresaService,
              private tipoDocumentoService: TipoDocumentoService,
              ) 
    { 
      this.addForm = this.frmBuilder.group({
        nombre: ['', Validators.required],
        numeroIdentificacion:['', Validators.required],
        idDepartamento: ['', Validators.required],
        idMunicipio: ['', Validators.required],
        idTipoDocumento: ['', Validators.required],
        direccion:[],
        telefono:[],
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
    tiposDocumento:any=null


    //Objeti empresa
    empresa:Empresa ={
      numeroIdentificacion:'',
      idTipoDocumento: 0,
      nombre: '',
      idMunicipio: 0,
      direccion: '',
      telefono: '',
      idDepartamento:0
    }

    ngOnInit(): void {
      this.listTipoDocumento()
      this.listEmpresa()
      this.listDepartamento();
    }

    changeState(empresa:Empresa){
      this.empresaService.changeState(empresa).subscribe(
        data => {
          this.listEmpresa();
        }
      );
    }

    getEmpresa(empresa:Empresa)
    {
      //console.log(empresa)
      this.modoEdicion = true;
      this.empresa = empresa;
      this.idDepartamento = empresa.idDepartamento
      this.listMunicipio()
    }

    delEmpresa(empresa:Empresa){
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
    listMunicipio(){
      this.municipioService.listMunicipio(this.idDepartamento).subscribe(
        result => {
            this.municipios = result;
        }
      );
    }
    listDepartamento(){
      this.departamentoService.listDepartamento().subscribe(
        result => {
            this.departamentos = result;
        }
      );
    }
    listEmpresa(){
      this.empresaService.listEmpresa().subscribe(
        result => {
            this.empresas = result;
        }
      );
    }

    resetEmpresa(){
      this.empresa.numeroIdentificacion=''
      this.empresa.idTipoDocumento= 0
      this.empresa.nombre= ''
      this.empresa.idMunicipio= 0
      this.empresa.direccion= ''
      this.empresa.telefono= ''
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

    listTipoDocumento(){
      this.tipoDocumentoService.listTipoDocumento().subscribe(
        result => {
            this.tiposDocumento = result;
        }
      );
    }

}
