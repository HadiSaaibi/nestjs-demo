import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PublishersService } from './publishers.service';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  findAll() {
    return { publishers: this.publishersService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.findOne(id);
  }

  @Post()
  create(@Body() publisher: { name: string }) {
    return this.publishersService.create(publisher);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() publisher: { name?: string }) {
    return this.publishersService.update(id, publisher);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.delete(id);
  }
}
