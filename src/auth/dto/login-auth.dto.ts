import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDTO {
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
    description: 'Password of the admin',
    example: 'admincapekngoding',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
