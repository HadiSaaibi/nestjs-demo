import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('includeAuthor') includeAuthor?: string) {
    return { books: this.booksService.findAll(includeAuthor === 'true') };
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() book: { title: string; authorId: number; publisherId: number; genreIds: number[] }) {
    return this.booksService.create(book);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() bookUpdate: { title?: string; authorId?: number; publisherId?: number; genreIds?: number[] },
  ) {
    return this.booksService.update(id, bookUpdate);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.delete(id);
  }
}