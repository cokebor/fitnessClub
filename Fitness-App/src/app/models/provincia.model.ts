import { LocalidadModel } from "./localidad.model";
import { PaisModel } from "./pais.model";

export class ProvinciaModel {
    idProvincia:number;
    nombre:string;
    pais:PaisModel;
}
