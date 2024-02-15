import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { DatePipe } from '@angular/common';

import { FinancieraService } from 'src/app/services/financiera.service'

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  addFormEntrada: FormGroup;
  constructor(private frmBuilder: FormBuilder,
    public datepipe: DatePipe,
    private financieraService : FinancieraService,
    ){
    this.filterForm = this.frmBuilder.group({
    fecha:['', Validators.required],
    })
    this.addForm = this.frmBuilder.group({
      numero: [],
      concepto: ['', Validators.required],
      valor: ['', Validators.required],
    });
    this.addFormEntrada = this.frmBuilder.group({
      numero: [],
      concepto: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }  
  fecha: string = ''
  pagos: any = null
  salidas: any = null
  salida: any = {
    numero:'',
    concepto:'',
    valor:0,
    fecha:'',
  }
  resumen:any = {
    pago:0,
    salida:0,
    total:0,
  }

  entrada: any = {
    numero:'',
    concepto:'',
    valor:0,
    fecha:'',
  }


  ngOnInit(): void {
    this.getFecha()
    this.movimiento()
  }
  getFecha()
  {
    const now = new Date();
    this.fecha = now.toISOString().substring(0,10)
    //console.log(this.fecha)
  }
  listPagos(){
    this.financieraService.listPagosByFecha(this.fecha).subscribe(
      result => {
          this.pagos = result;
      }
    );
  }
  listSalidas(){
    this.financieraService.listSalidas(this.fecha).subscribe(
      result => {
          this.salidas = result;
      }
    );
  }
  movimiento(){
    this.listPagos()
    this.listSalidas()
    this.listResumen()
  }
  listResumen(){
    this.financieraService.listResumen(this.fecha).subscribe(
      result => {
          this.resumen = result;
      }
    );
  }
  addSalida(){
    let data:any=null
    this.salida.fecha = this.fecha
    this.financieraService.addSalida(this.salida).subscribe(
      result => {
          data = result;
          this.listSalidas();
          this.listResumen();
      }
    );
  }
  delSalida(idSalida:number){
    let data:any=null
    if(confirm('Realmente desea elimnar el registro?')){
      this.financieraService.delSalida(idSalida).subscribe(
        result => {
            data = result;
            this.listSalidas();
            this.listResumen();
        }
      );
    }
  }
  addEntrada(){
    let data:any=null
    this.entrada.fecha = this.fecha
    this.financieraService.addEntrada(this.entrada).subscribe(
      result => {
          data = result;
          this.listPagos();
          this.listSalidas();
          this.listResumen();
      }
    );
  }
  delEntrada(idEntrada:number){
    let data:any=null
    if(confirm('Realmente desea elimnar el registro?')){
      this.financieraService.delEntrada(idEntrada).subscribe(
        result => {
            data = result;
            this.listPagos();
            this.listSalidas();
            this.listResumen();
        }
      );
    }
  }
  prnRecibo(pago:any){
    this.financieraService.prnReciboEntrada(pago).subscribe(
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

}
