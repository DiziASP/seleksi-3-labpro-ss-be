import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthModule } from '../src/auth/auth.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PerusahaanModule } from '../src/perusahaan/perusahaan.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        AuthModule,
        PrismaModule,
        JwtModule,
        PerusahaanModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET Perusahaan', () => {
    return request(app.getHttpServer()).get('/perusahaan').expect(200);
  });

  it('/GET Perusahaan By ID', () => {
    return request(app.getHttpServer()).get('/perusahaan/1').expect(403);
  });

  it('/UPDATE Perusahaan', () => {
    return request(app.getHttpServer())
      .put('/perusahaan/1')
      .send({
        nama: 'PT. Test',
        alamat: 'Jl. Test',
        no_telp: '081234567890',
        kode: 'ABC',
      })
      .expect(400);
  });
});
