import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'
import { MunicipioService } from  'src/app/services/municipio.service'
import { DepartamentoService } from 'src/app/services/departamento.service'
import { PersonaService } from 'src/app/services/persona.service'
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service'
import { Persona } from 'src/app/models/persona'

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {
  filterForm: FormGroup;
  addForm: FormGroup;
  constructor(private frmBuilder: FormBuilder,
              private municipioService: MunicipioService,
              private departamentoService: DepartamentoService,
              private personaService: PersonaService,
              private tipoDocumentoService: TipoDocumentoService
              ) 
    { 
      this.addForm = this.frmBuilder.group({
        idTipoDocumento: [0, Validators.required],
        numeroIdentificacion:['', Validators.required],
        primerNombre: ['', Validators.required],
        segundoNombre: [],
        primerApellido: ['', Validators.required],
        segundoApellido: [], 
        fechaNacimiento:[],          
        idDepartamentoNacimiento: [],
        idMunicipioNacimiento: [],
        idDepartamentoResidencia: [],
        idMunicipioResidencia: [],
        direccion:[],
        celular:[],
      });
      this.filterForm = this.frmBuilder.group({
        palabraBuscar:[]
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

    //Objeti persona
    persona:Persona ={
      identificacion:'',
      idTipoDocumento:2,
      primerNombre:'',
      segundoNombre:'',
      primerApellido:'',
      segundoApellido:'',
      fechaNacimiento:'',
      idMunicipioNacimiento:0,
      direccion:'',
      celular:'',
      idDepartamentoNacimiento:0,
      idDepartamentoResidencia:0,
      idMunicipioResidencia:0,
      municipioNacimiento:'',
      municipioResidencia:'',
      abreviatura:'',
    }

    ngOnInit(): void {
      this.listTipoDocumento()
      this.listPersona()
      this.listDepartamento()
      
    }

    changeState(persona:Persona){
      this.personaService.changeState(persona).subscribe(
        data => {
          this.listPersona();
        }
      );
    }

    getPersona(persona:Persona)
    {
      this.modoEdicion = true;
      this.persona = persona;
      this.idDepartamentoNacimiento = persona.idDepartamentoNacimiento
      this.idDepartamentoResidencia = persona.idDepartamentoResidencia
      this.listMunicipioNacimiento()
      this.listMunicipioResidencia()
    }

    delPersona(persona:Persona){
      if(confirm('Realmente desea elimnar el registro?')){
        this.personaService.delPersona(persona).subscribe(
          data => {
            this.listPersona();
          }
        );
      }  
    }
    addPersona(){
      this.personaService.createPersona(this.persona).subscribe(
        data => {
          this.resetPersona();
          this.listPersona();
        }
      );
    }
    
    updatePersona()
    {
      this.personaService.updatePersona(this.persona).subscribe(
        data => {
          this.resetPersona();
          this.listPersona();
        }
      )
    }
    listMunicipioNacimiento(){
      this.municipioService.listMunicipio(this.idDepartamentoNacimiento).subscribe(
        result => {
            this.municipiosNacimiento = result;
            
        }
      );
    }
    listMunicipioResidencia(){
      this.municipioService.listMunicipio(this.idDepartamentoResidencia).subscribe(
        result => {
            this.municipiosResidencia = result;
            
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
    listPersona(){
      this.personaService.listPersona().subscribe(
        result => {
            this.personas = result;
            //console.log(this.personas)
        }
      );
    }

    resetPersona(){
      this.persona.identificacion=''
      this.persona.idTipoDocumento=0
      this.persona.primerNombre=''
      this.persona.segundoNombre=''
      this.persona.primerApellido=''
      this.persona.segundoApellido=''
      this.persona.fechaNacimiento=''
      this.persona.idMunicipioNacimiento=0
      this.persona.direccion=''
      this.persona.celular=''
      this.persona.idDepartamentoNacimiento=0
      this.persona.idDepartamentoResidencia=0
      this.persona.idMunicipioResidencia=0
    }
    
    searchPersona(){
      this.personas = null
      this.personaService.search(this.palabraBuscar).subscribe(
      (result:any) => {
        if(result != null)  
          this.personas = result;
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
