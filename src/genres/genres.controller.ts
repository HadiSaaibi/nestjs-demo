import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GenresService } from './genres.service';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiOperation({ summary: 'Get all genres' })
  @Get()
  findAll() {
    return { genres: this.genresService.findAll() };
  }

  @ApiOperation({ summary: 'Get a genre by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a genre' })
  @Post()
  create(@Body() genre: { name: string }) {
    return this.genresService.create(genre);
  }

  @ApiOperation({ summary: 'Update a genre' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() genre: { name?: string }) {
    return this.genresService.update(id, genre);
  }

  @ApiOperation({ summary: 'Delete a genre' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.genresService.delete(id);
  }
}
