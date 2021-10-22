import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';

//продукт - это то что показываем в топ рейтинге
@Controller('product')
export class ProductController {
  //при создании продукта id в базе нету, при обновлении - есть

  //код ответа по дефолту 201 - подходящий
  //Omit исключает конкретные поля (Pick обратная сторона Omit(что нужно))
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {

  }

  @Get(':id')
  async get(@Param('id') id: string) {

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }

  //тут кроме параметра нужно чтобы в body пришла вся модель продукта
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {

  }

  //код ответа по дефолту 201 у пост, но мы ничего не обновили поэтому 200
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindProductDto) {

  }

}
