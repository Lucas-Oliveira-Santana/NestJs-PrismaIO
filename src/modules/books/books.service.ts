import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { BookDTO } from './book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: BookDTO) {
    const bookAlreadyExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookAlreadyExists) {
      throw new Error(`Book already exists`);
    }
    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }

  async list() {
    const books = await this.prisma.book.findMany();

    return books;
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });
    if (!bookExists) {
      throw new Error('Book not found');
    }
    return await this.prisma.book.update({
      data,
      where: {
        id: bookExists.id,
      },
    });
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: { id },
    });
    if (!bookExists) {
      throw new Error('Book not found');
    }

    return await this.prisma.book.delete({
      where: { id },
    });
  }
}
