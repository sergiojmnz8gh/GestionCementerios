export interface Concesion {
    id: number;
    fechaCompra: Date;
    fechaFin: Date;
    precioFinal: number;
    ciudadano: string;
    parcelas: [];
}