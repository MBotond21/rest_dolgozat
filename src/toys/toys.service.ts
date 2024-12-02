import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ToysService {
  db: PrismaService

  constructor(db: PrismaService){
    this.db = db
  }

  create(createToyDto: CreateToyDto) {
    return this.db.toy.create({
      data: createToyDto
    });
  }

  findAll() {
    return this.db.toy.findMany();
  }

  async findOne(id: number) {
    const toy =  await this.db.toy.findUnique({
      where: {id}
    });
    if(!toy){
      throw new NotFoundException(`Toy with id ${id} not found!`);
    }
    return toy;
  }

  async update(id: number, updateToyDto: UpdateToyDto) {
    const toy =  await this.db.toy.update({
      where: {id},
      data: updateToyDto
    });
    if(!toy){
      throw new NotFoundException(`Toy with id ${id} not found!`);
    }
    return toy;
  }

  async remove(id: number) {
    const toy =  await this.db.toy.delete({
      where: {id}
    });
    if(!toy){
      throw new NotFoundException(`Toy with id ${id} not found!`);
    }
    return;
  }
}
