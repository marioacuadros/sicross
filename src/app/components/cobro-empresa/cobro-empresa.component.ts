import { Component, ViewChild, ElementRef } from '@angular/core';;
import { EmpresaService } from 'src/app/services/empresa.service'
import { FormGroup, FormBuilder, Validators} from '@angular/forms'


@Component({
  selector: 'app-cobro-empresa',
  templateUrl: './cobro-empresa.component.html',
  styleUrls: ['./cobro-empresa.component.css']
})
export class CobroEmpresaComponent {
  @ViewChild('botonCerrar') botonCerrar!: ElementRef;
  filterForm: FormGroup;
  addForm:FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private empresaService: EmpresaService,
              )
  {
    this.filterForm = this.frmBuilder.group({
      idEmpresa:['', Validators.required],
      mes:['', Validators.required],
      anio:['', Validators.required],
    })
    this.addForm = this.frmBuilder.group({
      idEmpresa: [],
      administracion: ['', Validators.required],
      aportes: ['', Validators.required],
      opcion: ['', Validators.required],
      banco: ['', Validators.required],
    });
  }
  empresas:any=null
  idEmpresa:string = ''
  mes:string = ''
  anio : number = 0
  cobros : any = null
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
  cobro : any = {
    idEmpresa:0,
    empresa:'',
    administracion:0,
    aportes:0,
    opcion:3,
    cuenta:'',
  };
 
  cuenta: any = {
    id:0,
    idEmpresa:'',
    fecha:'',
  }
  
  bancos:any=null

  ngOnInit(): void {
    this.listEmpresa()
    this.listAnios()
    this.listBancos()
  }
  listCobro(){
    this.empresaService.listCobro(this.idEmpresa, this.anio, this.mes).subscribe(
      result => {
          this.cobros = result;
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
  listEmpresa(){
    this.empresaService.listEmpresa().subscribe(
      result => {
          this.empresas = result;
      }
    );
  }
  getCobro(cobro:any){
    this.cobro = cobro;
  }
  facturar(cobro:any){
    console.log(cobro)
    this.empresaService.facturar(cobro).subscribe(
      result => {
          //this.cobro;
      }
    );
  }
  public openPDF(): void {
    this.empresaService.prnCuenta(this.cobro).subscribe(
      result => {
          //this.empresas = result;
      }
    );
    /*
    this.botonCerrar.nativeElement.click();
    let DATA: any = document.getElementById('prnCuenta');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('content.pdf');
    });
    */
  }

  listBancos(){
    this.empresaService.listBanco().subscribe(
      result => {
          this.bancos = result;
      }
    );
  }
}

