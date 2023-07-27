import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreatePerusahaanDto } from './dto/create-perusahaan.dto';
import { UpdatePerusahaanDto } from './dto/update-perusahaan.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PerusahaanService {
  constructor(private readonly prisma: PrismaService) {}

  async addPerusahaan(createPerusahaanDto: CreatePerusahaanDto) {
    try {
      const perusahaan = await this.prisma.perusahaan.create({
        data: {
          nama: createPerusahaanDto.nama,
          alamat: createPerusahaanDto.alamat,
          no_telp: createPerusahaanDto.no_telp,
          kode: createPerusahaanDto.kode,
        },
      });

      return perusahaan;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `Perusahaan dengan kode ${createPerusahaanDto.kode} sudah ada`,
          );
        }
      }
      throw error;
    }
  }

  async getPerusahaan(q: string) {
    try {
      if (q) {
        const perusahaan = await this.prisma.perusahaan.findMany({
          where: {
            OR: [
              {
                nama: {
                  contains: q,
                },
              },
              {
                kode: {
                  contains: q,
                },
              },
            ],
          },
        });
        if (perusahaan.length === 0) {
          throw new ForbiddenException('Perusahaan tidak ditemukan');
        }
        return perusahaan;
      }

      return await this.prisma.perusahaan.findMany();
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2018') {
          throw new ForbiddenException('Perusahaan tidak ditemukan');
        }
      }
      throw error;
    }
  }

  async getPerusahaanByID(id: string) {
    const perusahaan = await this.prisma.perusahaan.findUnique({
      where: {
        id: id,
      },
    });

    if (!perusahaan) {
      throw new ForbiddenException('Perusahaan tidak ditemukan');
    }

    return perusahaan;
  }

  async updatePerusahaan(id: string, updatePerusahaanDto: UpdatePerusahaanDto) {
    try {
      const perusahaan = await this.prisma.perusahaan.update({
        where: {
          id: id,
        },
        data: updatePerusahaanDto,
      });

      return perusahaan;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `Perusahaan dengan kode ${updatePerusahaanDto.kode} sudah ada`,
          );
        }
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async removePerusahaan(id: string) {
    try {
      const perusahaan = await this.prisma.perusahaan.delete({
        where: {
          id: id,
        },
      });

      return perusahaan;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2018') {
          throw new ForbiddenException('Perusahaan tidak ditemukan');
        } else if (error.code === 'P2025') {
          throw new ForbiddenException('Perusahaan tidak dapat dihapus');
        }
      }
      throw error;
    }
  }
}
