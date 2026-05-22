import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import { GenresService } from 'src/genres/genres.service';
import { PublishersService } from 'src/publishers/publishers.service';

@Injectable()
export class BooksService {
  private books = [
      {
        id: 1,
        title: "Harry and the Sorcerer's Stone",
        authorId: 1,
        publisherId: 1,
        genreIds: [1, 3] 
      },
      {
        id: 2,
        title: 'Harry Potter and the Chamber of Secrets',
        authorId: 1,
        publisherId: 1,
        genreIds: [1, 3] 
      },
      {
        id: 3,
        title: 'How to make friends and influence people',
        authorId: 2,
        publisherId: 2,
        genreIds: [2] 
      }
  ];

  constructor(    
    private readonly authorsService: AuthorsService,
    private readonly publishersService: PublishersService,
    private readonly genresService: GenresService
  ) {}

    findAll(includeAuthor = false) {
      if (!includeAuthor) return this.books;

      return this.books.map((book) => {
        const author = this.authorsService.findOne(book.authorId);
        return {...book, author}
      })
    }
  
    findOne(id: number) {
      const book = this.books.find((book) => book.id === id);
      if (!book) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      return book;
    }
  
    create(book: { title: string; authorId: number, publisherId: number; genreIds: number[] }) {
      this.authorsService.findOne(book.authorId);
      this.publishersService.findOne(book.publisherId);
      book.genreIds.forEach((id) => this.genresService.findOne(id));

      const newBook = {
        id: this.books[this.books.length - 1].id + 1,
        ...book,
      };
      
      this.books.push(newBook);
      return newBook;
    }
  
    update(id: number, book: { title?: string; authorId?: number, publisherId?: number; genreIds?: number[] }) {
      if (book.authorId !== undefined) {
        this.authorsService.findOne(book.authorId);
      }
      if (book.publisherId !== undefined) {
        this.publishersService.findOne(book.publisherId);
      }
      if (book.genreIds !== undefined) {
        book.genreIds.forEach((gid) => this.genresService.findOne(gid));
      }
      const bookIndex = this.books.findIndex((book) => book.id === id);
  
      if (bookIndex === -1) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      this.books[bookIndex] = {
        ...this.books[bookIndex],
        ...book,
      };
      return this.books[bookIndex];
    }
  
    delete(id: number) {
      const bookIndex = this.books.findIndex((book) => book.id === id);
      if (bookIndex === -1) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      this.books.splice(bookIndex, 1);
  
      return bookIndex;
    }  
}
