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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BarangEntity } from './entities';

@ApiTags('Barang')
@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @Post()
  @ApiCreatedResponse({ type: BarangEntity })
  async createBarang(
    @Body() createBarangDto: CreateBarangDto,
  ): Promise<BarangEntity> {
    return this.barangService.createBarang(createBarangDto);
  }

  @Get()
  @ApiOkResponse({ type: BarangEntity, isArray: true })
  async getBarang(
    @Query('q') q: string,
    @Query('perusahaan') perusahaan: string,
  ): Promise<BarangEntity[]> {
    return this.barangService.getBarang(q, perusahaan);
  }

  @Get(':id')
  @ApiOkResponse({ type: BarangEntity })
  async getBarangByID(@Param('id') id: string): Promise<BarangEntity> {
    return this.barangService.getBarangByID(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BarangEntity })
  updateBarang(
    @Param('id') id: string,
    @Body() updateBarangDto: UpdateBarangDto,
  ): Promise<BarangEntity> {
    return this.barangService.updateBarang(id, updateBarangDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BarangEntity })
  deleteBarang(@Param('id') id: string): Promise<BarangEntity> {
    return this.barangService.deleteBarang(id);
  }
}
