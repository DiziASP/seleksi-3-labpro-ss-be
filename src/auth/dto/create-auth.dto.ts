import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    type: String,
    description: 'Username of the admin',
    example: 'admindizi',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Name of the admin',
    example: 'dizitheadmin',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Password of the admin',
    example: 'admincapekngoding',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
