
const enum Estado {
    'ENCARGADO',
    'CORTADO',
    'PROBADO',
    'ENTREGADO',
    'CANCELADO'

};

const enum TipoEncargo {
    'QUINCE',
    'NOVIA',
    'MADRINA',
    'FIESTA',
    'POLICIA'

};
import { Pago } from '../pago';
import { Cliente } from '../cliente';
export class Encargo {
    constructor(
        public id?: number,
        public importeTotal?: number,
        public fechaEncargo?: any,
        public fechaEntrega?: any,
        public detalleVestido?: string,
        public estado?: Estado,
        public tipoEncargo?: TipoEncargo,
        public pago?: Pago,
        public cliente?: Cliente,
    ) {
    }
}
