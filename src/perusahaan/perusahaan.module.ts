import { Module } from '@nestjs/common';
import { PerusahaanService } from './perusahaan.service';
import { PerusahaanController } from './perusahaan.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [PerusahaanController],
  providers: [PerusahaanService, PrismaService],
})
export class PerusahaanModule {}
