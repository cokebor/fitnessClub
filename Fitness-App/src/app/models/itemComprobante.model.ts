import { ProductoModel } from "./producto.model";

export class ItemComprobanteModel {
    renglon:number;
    producto:ProductoModel;
    cantidad:number;
    precioUnitario:number;

    subTotal(){
        return Math.round(this.cantidad*this.precioUnitario);
    }
}
