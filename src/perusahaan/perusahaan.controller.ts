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
import { PerusahaanService } from './perusahaan.service';
import { CreatePerusahaanDto } from './dto/create-perusahaan.dto';
import { UpdatePerusahaanDto } from './dto/update-perusahaan.dto';

@Controller('perusahaan')
export class PerusahaanController {
  constructor(private readonly perusahaanService: PerusahaanService) {}

  @Post()
  async addPerusahaan(@Body() createPerusahaanDto: CreatePerusahaanDto) {
    return this.perusahaanService.addPerusahaan(createPerusahaanDto);
  }

  @Get()
  async getPerusahaan(@Query('q') q: string) {
    return this.perusahaanService.getPerusahaan(q);
  }

  @Get(':id')
  getPerusahaanByID(@Param('id') id: string) {
    return this.perusahaanService.getPerusahaanByID(id);
  }

  @Patch(':id')
  async updatePerusahaan(
    @Param('id') id: string,
    @Body() updatePerusahaanDto: UpdatePerusahaanDto,
  ) {
    return this.perusahaanService.updatePerusahaan(id, updatePerusahaanDto);
  }

  @Delete(':id')
  removePerusahaan(@Param('id') id: string) {
    return this.perusahaanService.removePerusahaan(id);
  }
}
