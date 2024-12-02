import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChildrenService {
  db: PrismaService

  constructor(db: PrismaService){
    this.db = db
  }

  create(createChildDto: CreateChildDto) {
    return this.db.child.create({
      data: createChildDto
    });
  }

  findAll() {
    return this.db.child.findMany({
      include: {
        toys: true
      }
    });
  }

  findOne(id: number) {
    return this.db.child.findUnique({
      where: { id },
      include: {
        toys: true
      }
    });
  }

  update(id: number, updateChildDto: UpdateChildDto) {
    return this.db.child.update({
      where: { id },
      data: updateChildDto
    });
  }

  remove(id: number) {
    return this.db.child.delete({
      where: { id }
    });
  }
}
