import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Cotizador } from 'src/app/models/cotizador'
import { CotizadorService } from 'src/app/services/cotizador.service'
import { EmpresaService } from 'src/app/services/empresa.service'

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private cotizadorService: CotizadorService,
              private empresaService: EmpresaService,
              )
  {
    this.addForm = this.frmBuilder.group({
      idEmpresa: ['', Validators.required],
      valorAdministracion: ['', Validators.required],
      pagoIndividual:[],
    });
    this.filterForm = this.frmBuilder.group({
      palabraBuscar:[]
    })
  }
  palabraBuscar:string=''
  modoEdicion : boolean = false
  cotizadores : any = null
  empresas : any = null
  //Objeti cotizador
  cotizador:Cotizador ={
    id: 0,
    idEmpresa: '',
    valorAdministracion: 0,
    pagoIndividual: 0,
  }

  ngOnInit(): void {
    this.listCotizador()
    this.listEmpresa()
  }

  changeState(cotizador:Cotizador){
    this.cotizadorService.changeState(cotizador).subscribe(
      data => {
        this.listCotizador();
      }
    );
  }

  getCotizador(cotizador:Cotizador)
  {
    //console.log(cotizador)
    this.modoEdicion = true;
    this.cotizador = cotizador;
  }

  delCotizador(cotizador:Cotizador){
    if(confirm('Realmente desea elimnar el registro?')){
      this.cotizadorService.delCotizador(cotizador).subscribe(
        data => {
          this.listCotizador();
        }
      );
    }  
  }
  addCotizador(){
    this.cotizadorService.createCotizador(this.cotizador).subscribe(
      data => {
        this.resetCotizador();
        this.listCotizador();
      }
    );
  }
  
  updateCotizador()
  {
    this.cotizadorService.updateCotizador(this.cotizador).subscribe(
      data => {
        this.resetCotizador();
        this.listCotizador();
      }
    )
  }
  listCotizador(){
    this.cotizadorService.listCotizador().subscribe(
      result => {
          this.cotizadores = result;
      }
    );
  }

  resetCotizador(){
    this.cotizador.id = 0
    this.cotizador.idEmpresa = ''
    this.cotizador.valorAdministracion= 0
    this.cotizador.pagoIndividual= 0
  }
  
  searchCotizador(){
    this.cotizadores = null
    this.cotizadorService.search(this.palabraBuscar).subscribe(
    (result:any) => {
      if(result != null)  
        this.cotizadores = result;
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
  changeValue(cotizador:Cotizador){
    if (this.cotizador.pagoIndividual == 1)
      this.cotizador.pagoIndividual = 0
    else
      this.cotizador.pagoIndividual = 1
  }
}
