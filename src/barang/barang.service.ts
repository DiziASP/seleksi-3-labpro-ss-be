import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BarangService {
  constructor(private prisma: PrismaService) {}

  async createBarang(createBarangDto: CreateBarangDto) {
    try {
      const barang = await this.prisma.barang.create({
        data: {
          nama: createBarangDto.nama,
          harga: createBarangDto.harga,
          stok: createBarangDto.stok,
          kode: createBarangDto.kode,
          perusahaan: {
            connect: {
              id: createBarangDto.perusahaan_id,
            },
          },
        },
      });

      return barang;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Barang sudah ada');
        } else if (error.code === 'P2018') {
          throw new ForbiddenException('Perusahaan tidak ditemukan');
        }
      }
      throw error;
    }
  }

  async getBarang(q: string, perusahaan: string) {
    try {
      if (q || perusahaan) {
        const barang = await this.prisma.barang.findMany({
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
              {
                perusahaan_id: {
                  equals: perusahaan,
                },
              },
            ],
          },
          include: {
            perusahaan: true,
          },
        });
        if (barang.length === 0) {
          throw new ForbiddenException('Barang tidak ditemukan');
        }

        return barang;
      }

      return await this.prisma.barang.findMany();
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2018') {
          throw new ForbiddenException('Perusahaan tidak ditemukan');
        }
      }
      throw error;
    }
  }

  async getBarangByID(id: string) {
    try {
      const barang = await this.prisma.barang.findUnique({
        where: {
          id: id,
        },
        include: {
          perusahaan: true,
        },
      });

      if (!barang) {
        throw new ForbiddenException('Barang tidak ditemukan');
      }

      return barang;
    } catch (error) {
      throw error;
    }
  }

  async updateBarang(id: string, updateBarangDto: UpdateBarangDto) {
    try {
      const barang = await this.prisma.barang.update({
        where: {
          id: id,
        },
        data: updateBarangDto,
      });

      return barang;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Barang sudah ada');
        } else if (error.code === 'P2025') {
          throw new ForbiddenException('Barang tidak ditemukan');
        }
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async deleteBarang(id: string) {
    try {
      const barang = await this.prisma.barang.delete({
        where: {
          id: id,
        },
      });

      return barang;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('Barang tidak ditemukan');
        }
      }
      throw error;
    }
  }
}
