import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  list() {
    return this.bookService.list();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Patch('update')
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
