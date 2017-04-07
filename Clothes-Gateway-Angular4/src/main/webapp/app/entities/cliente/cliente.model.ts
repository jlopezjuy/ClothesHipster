import { Modelo } from '../modelo';
import { Medida } from '../medida';
import { Encargo } from '../encargo';
export class Cliente {
    constructor(
        public id?: number,
        public nombre?: string,
        public apellido?: string,
        public celular?: string,
        public telefono?: string,
        public email?: string,
        public domicilio?: string,
        public colegio?: string,
        public modelo?: Modelo,
        public medida?: Medida,
        public encargo?: Encargo,
    ) {
    }
}
