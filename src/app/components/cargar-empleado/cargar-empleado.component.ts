import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { EmpresaService } from 'src/app/services/empresa.service'
import {CargarEmpleadoService } from 'src/app/services/cargar-empleado.service'
import { Archivo } from 'src/app/models/archivo'

@Component({
  selector: 'app-cargar-empleado',
  templateUrl: './cargar-empleado.component.html',
  styleUrls: ['./cargar-empleado.component.css']
})
export class CargarEmpleadoComponent {
  filterForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private empresaService: EmpresaService,
              private cargarEmpleadoService:CargarEmpleadoService
              ) 
    { 
      this.filterForm = this.frmBuilder.group({
        strFile:['', Validators.required],
        idEmpresa:['', Validators.required]
      })
    }
  empresas:any=null
  idEmpresa:string = ''
  strFile:any=null
  respuesta:any=null

  archivo : Archivo = {
    idEmpresa : '',
    base64 : '',
    nombre:'',
  }

  ngOnInit(): void {
    this.listEmpresa()
  }

  listEmpresa(){
    this.empresaService.listEmpresa().subscribe(
      result => {
          this.empresas = result;
      }
    );
  }
  cargarEmpleado(e:any){
    let fileReader = new FileReader()
    let selectedFile = e.target.files[0]
    let fileType = ''
    fileType = selectedFile.name.split('.')[1]
    if (fileType !== 'csv'){
      alert('Tipo de archivo inválido')
    }else{
      fileReader.readAsDataURL(selectedFile)
      fileReader.onload=()=>{
        let result = fileReader.result;
        this.strFile = result
        this.archivo.idEmpresa = this.idEmpresa
        this.archivo.base64 = this.strFile
        //console.log(this.strFile)
        this.cargarEmpleadoService.cargarEmpleado(this.archivo).subscribe(
          result => {
              this.respuesta = result;
              //console.log(this.respuesta)
          }
        );
      }
      }
  }
}
