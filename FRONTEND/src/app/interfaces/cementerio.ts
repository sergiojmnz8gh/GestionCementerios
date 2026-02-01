import { Ayuntamiento } from "../pages/ayuntamiento/ayuntamiento";

export interface Cementerio {
    id:number;
    nombre: string;
    direccion: string;
    ayuntamiento: Ayuntamiento
}