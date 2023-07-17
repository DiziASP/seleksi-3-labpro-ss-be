import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateBarangDto } from './create-barang.dto';

export class UpdateBarangDto extends PartialType(
  OmitType(CreateBarangDto, ['perusahaan_id']),
) {}
