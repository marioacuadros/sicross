import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { AfiliacionService } from 'src/app/services/afiliacion.service'
import { EmpresaService } from 'src/app/services/empresa.service'
import { EmpresaPersonaService } from 'src/app/services/empresa-persona.service'
import { TipoAdministradoraService } from 'src/app/services/tipo-administradora.service'
import { EmpresaAdministradoraService } from 'src/app/services/empresa-administradora.service'
import { NivelRiesgoService } from 'src/app/services/nivel-riesgo.service'
import { PersonaService } from 'src/app/services/persona.service'
import { Afiliacion } from 'src/app/models/afiliacion'
import { Archivo } from 'src/app/models/archivo'


@Component({
  selector: 'app-afiliacion',
  templateUrl: './afiliacion.component.html',
  styleUrls: ['./afiliacion.component.css']
})
export class AfiliacionComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  cobroForm: FormGroup;
  loadForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private afiliacionService: AfiliacionService,
              private empresaService: EmpresaService,
              private empresaPersonaService: EmpresaPersonaService,
              private tipoAdministradoraService: TipoAdministradoraService,
              private empresaAdministradoraService: EmpresaAdministradoraService,
              private nivelRiesgoService: NivelRiesgoService,
              private personaService: PersonaService,
              ) 
    { 
      this.addForm = this.frmBuilder.group({
        idEmpresa: ['', Validators.required],
        idEmpleado: ['', Validators.required],
        idTipo: ['', Validators.required],
        idAdministradora: ['', Validators.required],
        fechaAfiliacion: ['', Validators.required],
        idNivelRiesgo: [],
      });
      this.filterForm = this.frmBuilder.group({
        palabraBuscar:[],
        idEmpresa:[]
      })
      this.cobroForm = this.frmBuilder.group({
        idEmpresa: [],
        administracion: ['', Validators.required],
        aportes: ['', Validators.required],
        opcion: ['', Validators.required],
        mes: ['', Validators.required],
        anio: ['', Validators.required],
        banco: ['', Validators.required],
      })
      this.loadForm = this.frmBuilder.group({
        strFile:[],
      })
    }

    afiliaciones:any=null
    modoEdicion : boolean = false
    palabraBuscar:string=''
    idEmpresa:string=''
    empresas:any=null
    empleados:any=null
    tipos:any=null
    afiliacions:any=null
    idTipo: number = 0
    administradoras:any=null
    niveles:any=null
    afiliados:any=null
    cobro : any = {
      idEmpleado:0,
      empleado:'',
      administracion:0,
      aportes:0,
      total:0,
      opcion:3,
      mes:'',
      anio:0,
      cuenta:'',
    };

    //Objeto afiliacion
    afiliacion:Afiliacion ={
      id:0,
      idEmpresa:'0',
      idPersona:'',
      idAdministradora:0,
      idNivelRiesgo:1,
      idTipo : 0,
      nombreEmpresa:'',
      nombrePersona:'',
      nombreAdministradora:'',
      nivelRiesgo:'',
      abreviatura:'',
      fechaAfiliacion:'',
      fechaRetiro:'',
      activo:0,
      documento:'',
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
    mes:string = ''
    anio : number = 0
    bancos:any = null
    cargarDocumento:boolean = false
    documento:string=''
    tipo:string=''
    id:number=0
    strFile:any=null
    respuesta:any=null
  
    archivo : Archivo = {
      idEmpresa : '',
      base64 : '',
      nombre : '',
      id:0,
      idPersona:'',
    }
  

    ngOnInit(): void {
      this.listEmpresa()
      this.listAfiliacion()
      this.listTipos()
      this.listNiveles()
      this.listAnios()
      this.listBancos()
    }

    changeState(id:number){
      this.afiliacionService.changeState(id).subscribe(
        data => {
          this.listByEmpleado(this.afiliacion.idPersona, this.afiliacion.idEmpresa)
        }
      );
    }

    getAfiliacion(afiliado:any)
    {
      //this.modoEdicion = true
      this.afiliacion.idEmpresa = afiliado.idEmpresa
      this.afiliacion.idPersona = afiliado.idPersona
      this.afiliacion.nombrePersona = afiliado.nombrePersona
      this.afiliacion.nombreEmpresa = afiliado.nombreEmpresa
      this.afiliacion.documento = afiliado.documento
      this.listEmpresa()
      this.listAdministradoras()
      //this.listEmpleadoByEmpresa(afiliado.idEmpresa)
      this.listByEmpleado(this.afiliacion.idPersona, this.afiliacion.idEmpresa)
    }

    addAfiliacion(){
      this.afiliacionService.createAfiliacion(this.afiliacion).subscribe(
        data => {
          this.listByEmpleado(this.afiliacion.idPersona, this.afiliacion.idEmpresa)
          //this.resetAfiliacion();
          //this.listAfiliacion();
        }
      );
    }
    
    updateAfiliacion()
    {
      this.afiliacionService.updateAfiliacion(this.afiliacion).subscribe(
        data => {
          //this.resetAfiliacion();
          //this.listAfiliacion();
          this.modoEdicion = false
        }
      )
    }
    deleteAfiliacion(id:number)
    {
      this.afiliacionService.delAfiliacion(id).subscribe(
        data => {
          this.listByEmpleado(this.afiliacion.idPersona, this.afiliacion.idEmpresa)
        }
      )
    }
    listAfiliacion(){
      this.empresaPersonaService.listEmpresaPersona().subscribe(
        result => {
            this.afiliados = result;
        }
      );
    }

    resetAfiliacion(){
      this.afiliacion.id=0
      //this.afiliacion.idEmpresa=''
      this.afiliacion.idPersona=''
      this.afiliacion.idAdministradora=0
      this.afiliacion.idNivelRiesgo=0
      this.afiliacion.nombreEmpresa=''
      this.afiliacion.nombrePersona=''
      this.afiliacion.nombreAdministradora=''
      this.afiliacion.nivelRiesgo=''
      this.afiliacion.abreviatura=''
      this.afiliacion.fechaAfiliacion=''
      this.afiliacion.fechaRetiro=''
      this.afiliacion.activo=0
    }
    
    searchAfiliacion(){
      this.afiliacions = null
      this.empresaPersonaService.search(this.palabraBuscar).subscribe(
      (result:any) => {
        if(result != null)  
          this.afiliados = result;
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
    listByEmpleado(idPersona:string, idEmpresa:string ){
      this.afiliacionService.listByEmpleado(idPersona, idEmpresa).subscribe(
        result => {
            this.afiliacions = result;
        }
      );
    }
    listByEmpresa(idEmpresa:string){
      this.empresaPersonaService.listByEmpresa(idEmpresa).subscribe(
        result => {
          this.afiliados = result;
        }
      );
    }
    listEmpleadoByEmpresa(idEmpresa:string){
      this.empresaPersonaService.listByEmpresa(idEmpresa).subscribe(
        result => {
            this.empleados = result;
        }
      );
    }
    listTipos(){
      this.tipoAdministradoraService.listTipoAdministradora().subscribe(
        result => {
            this.tipos = result;
        }
      );
    }
    listAdministradoras(){
      this.empresaAdministradoraService.listByTipo(this.idTipo).subscribe(
        result => {
            this.administradoras = result;
        }
      );
    } 
    listNiveles(){
      this.nivelRiesgoService.listNivelRiesgo().subscribe(
        result => {
            this.niveles = result;
        }
      );
    }       
    getEstaAfiliacion(afiliacion:Afiliacion)
    {
      this.modoEdicion = true
      this.idTipo = afiliacion.idTipo
      this.afiliacion = afiliacion
      this.listAdministradoras()
    }
    chargeAfiliacion(afiliado:any){
      this.cobro.idEmpleado = afiliado.idPersona
      this.cobro.empleado = afiliado.nombrePersona
    }
    facturar(cobro:any){
      let data:any = null
      //console.log(cobro)
      this.personaService.facturar(cobro).subscribe(
        result => {
            data = result
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

    getCuenta(cobro:any){
      let cobroTmp: any = cobro
      this.personaService.getCuenta(cobro).subscribe(
        (result:any) => {
              this.cobro = result[0];
              //console.log(this.cobro)
              if(!this.cobro)
                this.cobro = cobroTmp
        }
      );
    }
    liquidar(cobro:any){
      let data:any = null
      this.personaService.liquidar(cobro.idEmpleado, cobro.mes, cobro.anio).subscribe(
        result => {
            data = result
            this.getCuenta(cobro)
        }
      );
    }
    listBancos(){
      this.empresaService.listBanco().subscribe(
        result => {
            this.bancos = result;
        }
      );
    }
    delAfiliacion(afiliacion:any)
    {
      this.afiliacion = afiliacion
      if(confirm('Realmente desea elimnar el registro?')){
        this.afiliacionService.delAfiliacion(this.afiliacion.id).subscribe(
          data => {
            this.listByEmpleado(this.afiliacion.idPersona, this.afiliacion.idEmpresa)
          }
        );
      }
    }
    changeLoad(typ:string, doc:string, id:number){
      this.cargarDocumento = !this.cargarDocumento
      this.documento = doc
      this.tipo = typ
      this.id = id
    }
    loadFile(e:any){
      let fileReader = new FileReader()
      let selectedFile = e.target.files[0]
      let fileType = ''
      fileType = selectedFile.name.split('.')[1]
      if (fileType !== 'pdf'){
        alert('Tipo de archivo inválido')
      }else{
        fileReader.readAsDataURL(selectedFile)
        fileReader.onload=()=>{
          let result = fileReader.result;
          this.strFile = result
          this.archivo.nombre = this.documento + '_' + this.tipo + '.pdf'
          this.archivo.base64 = this.strFile
          this.archivo.id = this.id
          this.archivo.idPersona = this.documento
          //console.log(this.strFile)
          this.afiliacionService.cargarArchivo(this.archivo).subscribe(
            result => {
                this.respuesta = result;
                this.cargarDocumento = false;
                this.listByEmpleado(this.afiliacion.idPersona, this.afiliacion.idEmpresa)
                //console.log(this.respuesta)
            }
          );
        }
      }
  
    }
 }
