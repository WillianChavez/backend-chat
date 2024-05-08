import Usuario from "src/common/database/models/usuario.model";

export type UserTfaDto = Usuario & {
  tfaRequerido: boolean;
  tfaPasado: boolean;
  idDispositivo?: number;
}