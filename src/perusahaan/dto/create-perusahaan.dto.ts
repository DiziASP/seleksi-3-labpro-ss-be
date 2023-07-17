import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumberString,
  MaxLength,
  IsUppercase,
  MinLength,
} from 'class-validator';

export class CreatePerusahaanDto {
  @ApiProperty({
    type: String,
    description: 'Nama Perusahaan',
    example: 'PT. ABC',
  })
  @IsString()
  @IsNotEmpty()
  nama: string;

  @ApiProperty({
    type: String,
    description: 'Alamat Perusahaan',
    example: 'Jl. ABC No. 123',
  })
  @IsString()
  @IsNotEmpty()
  alamat: string;

  @ApiProperty({
    type: String,
    description: 'Alamat Perusahaan',
    example: 'Jl. ABC No. 123',
  })
  @IsNumberString()
  @IsNotEmpty()
  no_telp: string;

  @ApiProperty({
    type: String,
    description: 'Kode Pajak Perusahaan',
    example: 'XYZ',
  })
  @IsString()
  @IsNotEmpty()
  @IsUppercase()
  @MinLength(3)
  @MaxLength(3)
  kode: string;
}
