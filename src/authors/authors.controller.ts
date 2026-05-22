import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Get all authors' })
  @Get()
  findAll() {
    return { authors: this.authorsService.findAll() };
  }

  @ApiOperation({ summary: 'Get an author by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Create an author' })
  @Post()
  create(@Body() author: { name: string; email: string }) {
    return this.authorsService.create(author);
  }

  @ApiOperation({ summary: 'Update an author' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() authorUpdate: { name?: string; email?: string },
  ) {
    return this.authorsService.update(id, authorUpdate);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.delete(id);
  }
}
