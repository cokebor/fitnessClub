import { ItemComprobanteModel } from "./itemComprobante.model";
import { UsuarioModel } from "./usuario.model";

export class ComprobanteModel {
    idComprobante:number;
    fecha:string;
    usuario:UsuarioModel;
    total:number;
    items:ItemComprobanteModel[];
}
