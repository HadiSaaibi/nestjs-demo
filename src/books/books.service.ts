import { Injectable } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  private books = [
      {
        id: 1,
        title: "Harry and the Sorcerer's Stone",
        authorId: 1,
    },
      {
        id: 2,
        title: 'Harry Potter and the Chamber of Secrets',
        authorId: 1,
    },
      {
        id: 3,
        title: 'How to make friends and influence people',
        authorId: 2,
      }
  ];

  constructor(private readonly authorsService: AuthorsService) {}
}
