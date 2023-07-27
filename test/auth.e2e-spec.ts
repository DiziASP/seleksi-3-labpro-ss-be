import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/auth/auth.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule, PrismaModule, JwtModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET Self', () => {
    return request(app.getHttpServer()).get('/self').expect(401);
  });

  it('/POST Login', () => {
    return request(app.getHttpServer())
      .post('/login')
      .send({
        username: 'test',
        password: 'test',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
      });
  });

  it('/POST Register', () => {
    return request(app.getHttpServer())
      .post('/register')
      .send({
        username: 'test',
        name: 'test',
        password: 'test',
      })
      .expect(403);
  });
});
