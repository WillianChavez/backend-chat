import { PartialType } from "@nestjs/swagger";
import { CreateUsuarioPreferenciasDto } from "./create-usuario-preferencias.dto";

export class UpdateUsuarioPreferenciasDto extends PartialType(CreateUsuarioPreferenciasDto) { }