import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from './guard';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDTO: LoginAuthDTO) {
    return this.authService.login(loginAuthDTO);
  }

  @Get('self')
  @UseGuards(AuthGuard)
  getSelf(@Req() req: Request) {
    return this.authService.getSelf(req);
  }
}
