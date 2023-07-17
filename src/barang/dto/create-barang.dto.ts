import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateBarangDto {
  @ApiProperty({
    type: String,
    description: 'Nama Barang',
    example: 'Sanyobion',
  })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({
    type: Number,
    description: 'Harga Barang',
    example: 10000,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  harga: number;

  @ApiProperty({
    type: Number,
    description: 'Stok Barang',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  stok: number;

  @ApiProperty({
    type: String,
    description: 'Kode Barang',
    example: 'SB',
  })
  @IsString()
  @IsNotEmpty()
  kode: string;

  @ApiProperty({
    type: String,
    description: 'ID Perusahaan',
    example: '9474ee63-587f-45a0-b709-82395e2299e5',
  })
  @IsString()
  @IsNotEmpty()
  perusahaan_id: string;
}
