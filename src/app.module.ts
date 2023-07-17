import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BarangModule } from './barang/barang.module';
import { PerusahaanModule } from './perusahaan/perusahaan.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    BarangModule,
    PerusahaanModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
