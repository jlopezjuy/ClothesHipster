import { Cliente } from '../cliente';
export class Modelo {
    constructor(
        public id?: number,
        public imagen?: any,
        public nombreModelo?: string,
        public colorVestido?: string,
        public observacion?: string,
        public cliente?: Cliente,
    ) {
    }
}
