import { LocalidadModel } from "./localidad.model";
import { RolModel } from "./rol.model";

export class UsuarioModel {
    idUsuario:number;
    nombre:string;
    apellido:string;
    email:string;
    direccion:string;
    localidad:LocalidadModel;
    password:string;
    rol:RolModel;
    imagen:string='';
    estado:boolean=true;
}
