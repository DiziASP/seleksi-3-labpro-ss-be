import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { ApiTags } from '@nestjs/swagger';
import { BarangEntity } from './entities';

@ApiTags('Barang')
@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @Post()
  async createBarang(
    @Body() createBarangDto: CreateBarangDto,
  ): Promise<BarangEntity> {
    return this.barangService.createBarang(createBarangDto);
  }

  @Get()
  async getBarang(
    @Query('q') q: string,
    @Query('perusahaan') perusahaan: string,
  ): Promise<BarangEntity[]> {
    return this.barangService.getBarang(q, perusahaan);
  }

  @Get(':id')
  async getBarangByID(@Param('id') id: string): Promise<BarangEntity> {
    return this.barangService.getBarangByID(id);
  }

  @Patch(':id')
  updateBarang(
    @Param('id') id: string,
    @Body() updateBarangDto: UpdateBarangDto,
  ): Promise<BarangEntity> {
    return this.barangService.updateBarang(id, updateBarangDto);
  }

  @Delete(':id')
  deleteBarang(@Param('id') id: string): Promise<BarangEntity> {
    return this.barangService.deleteBarang(id);
  }
}
