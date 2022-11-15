import { ProvinciaModel } from "./provincia.model";

export class PaisModel {
    idPais:number;
    nombre:string;
    provincias:ProvinciaModel[];
}
