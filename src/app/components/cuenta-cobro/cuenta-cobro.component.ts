import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

import { FinancieraService } from 'src/app/services/financiera.service'

@Component({
  selector: 'app-cuenta-cobro',
  templateUrl: './cuenta-cobro.component.html',
  styleUrls: ['./cuenta-cobro.component.css']
})
export class CuentaCobroComponent {
  filterForm: FormGroup;
  pagoForm: FormGroup;

  constructor(private frmBuilder: FormBuilder,
              private financieraService: FinancieraService,
              )
  {
    this.filterForm = this.frmBuilder.group({
      palabraBuscar:[],
      mes:['', Validators.required],
      anio:['', Validators.required],
    })
    this.pagoForm = this.frmBuilder.group({
      valorPagar:['', Validators.required]
    })
  }  
  empresas:any=null
  idEmpresa:string = ''
  mes:string = ''
  anio : number = 0
  key : string = ''
  cuentas : any = null
  valorPagar : any = null
  pagos : any = null
  cuenta : any = {
    id : 0,
    idEmpresa: 0,
    nombre : '',
    mes : '',
    anio : 0,
    aportes : 0,
    administracion : 0,
    total : 0
  }
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
    this.listAnios()
    this.listCuenta()
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
  listCuenta(){
    this.financieraService.listCuenta(this.key, this.anio, this.mes ).subscribe(
      result => {
          this.cuentas = result;
          //console.log(this.cuentas)
      }
    );
  }  
  listTodos(){
    this.key = ''
    this.financieraService.listCuenta(this.key, this.anio, this.mes ).subscribe(
      result => {
          this.cuentas = result;
      }
    );
  }  

  prnCuenta(cuenta:any){
    this.financieraService.prnCuenta(cuenta).subscribe(
      (result:any) => {
          const newBlob = new Blob([result], {type: 'application/pdf'});
          const downloadLink = document.createElement('a');
          downloadLink.target = '_self';
          const fileName = 'content.pdf';
          const data = window.URL.createObjectURL(newBlob);
          downloadLink.href = data;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
      }
    );
  }

  getCuenta(cuenta:any){
    this.cuenta = cuenta
    this.valorPagar = this.cuenta.total
    this.listPagos(cuenta.id)
  }
  listPagos(idFactura : number){
    this.financieraService.listPagos(idFactura).subscribe(
      result => {
          this.pagos = result;
          //console.log(this.pagos)
      }
    );
  }
  addPago(cuenta:any, valorPagar:number){
    let data : any = null
    let pago : any = {
      identificacion : cuenta.idEmpresa,
      nombre : cuenta.nombre,
      valor : valorPagar,
      idFactura : cuenta.id
    }
    this.financieraService.addPago(pago).subscribe(
      result => {
          data = result
          this.listPagos(pago.idFactura)
      }
    ); 
  }
  delPago(idPago:number, idFactura:number){
    let data : any = null
    this.financieraService.delPago(idPago).subscribe(
      result => {
          data = result
          this.listPagos(idFactura)
      }
    ); 
  }
  prnRecibo(pago:any){
    pago.administracion = this.cuenta.administracion
    pago.aportes = this.cuenta.aportes
    this.financieraService.prnPago(pago).subscribe(
      (result:any) => {
          const newBlob = new Blob([result], {type: 'application/pdf'});
          const downloadLink = document.createElement('a');
          downloadLink.target = '_self';
          const fileName = 'content.pdf';
          const data = window.URL.createObjectURL(newBlob);
          downloadLink.href = data;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
      }
    );
  }
  delCotizacion(id:number){
    if(confirm('Realmente desea elimnar el registro?')){
      this.financieraService.delCotizacion(id).subscribe(
        data => {
          this.listCuenta()
        }
      );
    }  
  }
}
