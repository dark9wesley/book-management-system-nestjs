import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject(DbService)
  dbService: DbService;

  async list() {
    const books: Book[] = await this.dbService.read();

    return books;
  }

  async findById(id: string) {
    const books = await this.list();

    return books.find((book) => book.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books = await this.list();

    const newBook = new Book();
    newBook.name = createBookDto.name;
    newBook.author = createBookDto.author;
    newBook.description = createBookDto.description;
    newBook.cover = createBookDto.cover;
    newBook.id = randomNum().toString();

    await this.dbService.write([...books, newBook]);

    return newBook;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books = await this.list();

    const findBook = books.find((book) => book.id === updateBookDto.id);

    if (!findBook) {
      throw new BadRequestException('图书不存在');
    }

    if (updateBookDto.name) {
      findBook.name = updateBookDto.name;
    }

    if (updateBookDto.author) {
      findBook.author = updateBookDto.author;
    }

    if (updateBookDto.description) {
      findBook.description = updateBookDto.description;
    }

    if (updateBookDto.cover) {
      findBook.cover = updateBookDto.cover;
    }

    await this.dbService.write(books);

    return findBook;
  }

  async delete(id: string) {
    const books = await this.list();

    const findBook = books.find((book) => book.id === id);

    if (!findBook) {
      throw new BadRequestException('图书不存在');
    }

    const newBooks = books.filter((book) => book.id !== id);

    await this.dbService.write(newBooks);

    return findBook;
  }
}
