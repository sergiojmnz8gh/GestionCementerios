export interface Zona {
    id?: number;
    nombre: string;
    tipoZona: 'NICHO' | 'TUMBA' | 'CRIPTA';
    filas: number;
    columnas: number;
    cementerioId: number;
    posicionCanvas: string;
}