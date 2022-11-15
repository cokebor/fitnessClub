import { DisciplinaModel } from "./disciplina.model";
import { MarcaModel } from "./marca.model";
import { RubroModel } from "./rubro.model";

export class ProductoModel {
    idProducto:number;
    descripcion:string;
    rubro:RubroModel;
    disciplina:DisciplinaModel;
    marca:MarcaModel;
    precioUnitario:number;
    imagen:string='';
    stock:number;
    servicio:boolean=false;
    estado:boolean=true;
}
