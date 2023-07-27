import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthModule } from './../src/auth/auth.module';
import { PrismaModule } from './../src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { BarangModule } from '../src/barang/barang.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule, PrismaModule, JwtModule, BarangModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET Barang', () => {
    return request(app.getHttpServer()).get('/barang').expect(200);
  });

  it('/GET Barang By ID', () => {
    return request(app.getHttpServer()).get('/barang/1').expect(403);
  });

  it('/UPDATE Barang', () => {
    return request(app.getHttpServer())
      .put('/barang/1')
      .send({
        nama: 'PT. Test',
      })
      .expect(403);
  });
});
