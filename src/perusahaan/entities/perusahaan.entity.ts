import { ApiProperty } from '@nestjs/swagger';

export class PerusahaanEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  nama: string;

  @ApiProperty()
  alamat: string;

  @ApiProperty()
  no_telp: string;

  @ApiProperty()
  kode: string;
}
