import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Get all books' })
  @ApiQuery({ name: 'includeAuthor', required: false, type: Boolean })
  @Get()
  findAll(@Query('includeAuthor') includeAuthor?: string) {
    return { books: this.booksService.findAll(includeAuthor === 'true') };
  }

  @ApiOperation({ summary: 'Get a book by ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a book' })
  @Post()
  create(@Body() book: { title: string; authorId: number; publisherId: number; genreIds: number[] }) {
    return this.booksService.create(book);
  }

  @ApiOperation({ summary: 'Update a book' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookUpdate: { title?: string; authorId?: number; publisherId?: number; genreIds?: number[] },
  ) {
    return this.booksService.update(id, bookUpdate);
  }

  @ApiOperation({ summary: 'Delete a book' })
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}
