import { ApiProperty } from '@nestjs/swagger';

export class BarangEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nama: string;

  @ApiProperty()
  harga: number;

  @ApiProperty()
  stok: number;

  @ApiProperty()
  kode: string;

  @ApiProperty()
  perusahaan_id: string;
}
