import Usuario from "src/common/database/models/usuario.model";
import { UserTfaDto } from "./usertfa-dto";
import { Request as RequestExpress } from "express";

export interface Request extends RequestExpress {
  token?: string;
  jwtData?: UserTfaDto;
  usuario?: Usuario;
}