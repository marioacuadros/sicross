import { Component } from '@angular/core';
import { EmpresaService } from 'src/app/services/empresa.service'
import { LiquidadorService } from 'src/app/services/liquidador.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-liquidador',
  templateUrl: './liquidador.component.html',
  styleUrls: ['./liquidador.component.css']
})
export class LiquidadorComponent {
  filterForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private empresaService: EmpresaService,
              private liquidadorService: LiquidadorService,
              )
  {
    this.filterForm = this.frmBuilder.group({
      idEmpresa:['', Validators.required],
      mes:['', Validators.required],
      anio:['', Validators.required],
    })
  }
  empresas:any=null
  idEmpresa:string = ''
  mes:string = ''
  anio : number = 0
  empleados : any = null
  meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ]
  anios: number[] = [];
 
  
  ngOnInit(): void {
    this.listEmpresa()
    this.listAnios()
  }
  listEmpresa(){
    this.empresaService.listEmpresa().subscribe(
      result => {
          this.empresas = result;
      }
    );
  }
  listEmpleado(){
    this.liquidadorService.listEmpleados(this.idEmpresa, this.mes, this.anio).subscribe(
      result => {
          this.empleados = result;
      }
    );
  }
  listAnios(){
    const arr: number[] = []
    const currentYear  = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    arr.push(currentYear-1)
    arr.push(currentYear)
    arr.push(currentYear+1)
    this.anio = currentYear
    this.anios = arr
    this.mes = this.meses[currentMonth]
    
  }
  liquidar(){
    this.liquidadorService.liquidar(this.idEmpresa, this.mes, this.anio).subscribe(
      data => {
        this.listEmpleado();
      }
    );
  }
  delEmpleado(id:number){
    if(confirm('Realmente desea elimnar el registro?')){
      this.liquidadorService.delEmpleado(id).subscribe(
        data => {
          this.listEmpleado();
        }
      );
    }  
  }
}
