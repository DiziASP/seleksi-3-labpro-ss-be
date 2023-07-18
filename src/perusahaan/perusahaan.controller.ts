import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PerusahaanService } from './perusahaan.service';
import { CreatePerusahaanDto } from './dto/create-perusahaan.dto';
import { UpdatePerusahaanDto } from './dto/update-perusahaan.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PerusahaanEntity } from './entities/perusahaan.entity';
import { AuthGuard } from 'src/auth/guard';

@ApiTags('Perusahaan')
@Controller('perusahaan')
export class PerusahaanController {
  constructor(private readonly perusahaanService: PerusahaanService) {}

  @Post()
  @ApiCreatedResponse({ type: PerusahaanEntity })
  @UseGuards(AuthGuard)
  async addPerusahaan(
    @Body() createPerusahaanDto: CreatePerusahaanDto,
  ): Promise<PerusahaanEntity> {
    return this.perusahaanService.addPerusahaan(createPerusahaanDto);
  }

  @Get()
  @ApiOkResponse({ type: PerusahaanEntity, isArray: true })
  async getPerusahaan(@Query('q') q: string): Promise<PerusahaanEntity[]> {
    return this.perusahaanService.getPerusahaan(q);
  }

  @Get(':id')
  @ApiOkResponse({ type: PerusahaanEntity })
  getPerusahaanByID(@Param('id') id: string): Promise<PerusahaanEntity> {
    return this.perusahaanService.getPerusahaanByID(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PerusahaanEntity })
  async updatePerusahaan(
    @Param('id') id: string,
    @Body() updatePerusahaanDto: UpdatePerusahaanDto,
  ): Promise<PerusahaanEntity> {
    return this.perusahaanService.updatePerusahaan(id, updatePerusahaanDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: PerusahaanEntity })
  removePerusahaan(@Param('id') id: string): Promise<PerusahaanEntity> {
    return this.perusahaanService.removePerusahaan(id);
  }
}
