export interface Afiliacion{
    id:number;
    idEmpresa:string;
    idPersona:string;
    idAdministradora:number;
    idNivelRiesgo:number;
    idTipo:number;
    nombreEmpresa:string;
    nombrePersona:string;
    nombreAdministradora:string;
    nivelRiesgo:string;
    abreviatura:string;
    fechaAfiliacion:String;
    fechaRetiro:string;
    activo:number;
    documento?:string;
}