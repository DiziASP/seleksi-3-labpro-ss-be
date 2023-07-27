import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { AuthEntity } from './entities';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(createAuthDto: CreateAuthDto): Promise<AuthEntity> {
    try {
      const hashedPassword = await argon.hash(createAuthDto.password);

      const user = await this.prisma.user.create({
        data: {
          username: createAuthDto.username,
          name: createAuthDto.name,
          password: hashedPassword,
        },
      });

      return {
        user: {
          username: user.username,
          name: user.name,
        },
        token: await this.signToken(user.id, user.username),
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
    }
  }

  async login(loginAuthDTO: LoginAuthDTO): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: loginAuthDTO.username,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const validPassword = await argon.verify(
      user.password,
      loginAuthDTO.password,
    );

    if (!validPassword) {
      throw new ForbiddenException('Invalid credentials');
    }

    return {
      user: {
        username: user.username,
        name: user.name,
      },
      token: await this.signToken(user.id, user.username),
    };
  }

  async getSelf(req: Request) {
    const userData = this.extractUserData(req);

    const user = await this.prisma.user.findUnique({
      where: {
        username: userData.username,
      },
    });

    return {
      user: {
        username: user.username,
        name: user.name,
      },
    };
  }

  private extractUserData(req: Request): { sub: string; username: string } {
    if ('username' in req.user && 'sub' in req.user) {
      return {
        sub: String(req.user.sub),
        username: String(req.user.username),
      };
    }
  }
  async signToken(userId: string, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: secret,
    });

    return token;
  }
}
