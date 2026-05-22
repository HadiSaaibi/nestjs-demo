import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class GenresService {

 private genres = [
    { id: 1, name: 'Fantasy' },
    { id: 2, name: 'Self-Help' },
    { id: 3, name: 'Adventure' },
  ];

  findAll() {
    return this.genres;
  }

  findOne(id: number) {
    const genre = this.genres.find((g) => g.id === id);
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    return genre;
  }

  create(genre: { name: string }) {
    const newGenre = {
      id: this.genres[this.genres.length - 1].id + 1,
      ...genre,
    };
    this.genres.push(newGenre);
    return newGenre;
  }

  update(id: number, genre: { name?: string }) {
    const index = this.genres.findIndex((g) => g.id === id);
    if (index === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    this.genres[index] = { ...this.genres[index], ...genre };
    return this.genres[index];
  }

  delete(id: number) {
    const index = this.genres.findIndex((g) => g.id === id);
    if (index === -1) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    this.genres.splice(index, 1);
    return index;
  }
}
