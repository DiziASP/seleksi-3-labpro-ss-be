import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  user: {
    username: string;
    name: string;
  };

  @ApiProperty()
  token: string;
}
