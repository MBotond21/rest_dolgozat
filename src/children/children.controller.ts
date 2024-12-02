import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, Put } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const child = await this.childrenService.findOne(+id);
    if (!child) throw new NotFoundException(`No child with id ${id} found`);
    return child;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    const child = await this.childrenService.update(+id, updateChildDto);
    if (!child) throw new NotFoundException(`No child with id ${id} found`);
    return child;
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    const child = await this.childrenService.remove(+id);
    if (!child) throw new NotFoundException(`No child with id ${id} found`);
  }

  @Put(':id/toys/:toyId')
  async addToy(@Param('id') id: string, @Param('toyId') toyId: string){
    const child = await this.childrenService.addToy(+id, +toyId);
    if (!child) throw new NotFoundException(`No child with id ${id} or no toy with id ${toyId} found`);
    return child;
  }
}
