import { PartialType } from '@nestjs/swagger';
import { CreatePerusahaanDto } from './create-perusahaan.dto';

export class UpdatePerusahaanDto extends PartialType(CreatePerusahaanDto) {}
