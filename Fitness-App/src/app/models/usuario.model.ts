import { LocalidadModel } from "./localidad.model";
import { RolModel } from "./rol.model";

export class UsuarioModel {
    idUsuario:number;
    nombre:string;
    apellido:string;
    dni:number;
    email:string;
    direccion:string;
    localidad:LocalidadModel;
    password:string;
    passwordconfirm:string;
    rol:RolModel;
    //roles:string[];
    imagen:string='';
    estado:boolean=true;
}
