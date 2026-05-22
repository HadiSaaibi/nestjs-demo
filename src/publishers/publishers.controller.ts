import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublishersService } from './publishers.service';

@ApiTags('publishers')
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @ApiOperation({ summary: 'Get all publishers' })
  @Get()
  findAll() {
    return { publishers: this.publishersService.findAll() };
  }

  @ApiOperation({ summary: 'Get a publisher by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a publisher' })
  @Post()
  create(@Body() publisher: { name: string }) {
    return this.publishersService.create(publisher);
  }

  @ApiOperation({ summary: 'Update a publisher' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() publisher: { name?: string }) {
    return this.publishersService.update(id, publisher);
  }

  @ApiOperation({ summary: 'Delete a publisher' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.publishersService.delete(id);
  }
}
