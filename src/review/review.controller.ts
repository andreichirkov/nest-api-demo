import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
  //сервис подключаем к контроллеру, внедряем зависимость
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto)
  }

  //когда удаляем документ который не существуем получаем null
  @Delete(':id')
  async delete(@Param('id') id: string) {
    //!!! deletedDoc может принять DocumentType<ReviewModel> | null
    const deletedDoc = await this.reviewService.delete(id)
    if(!deletedDoc) {
      //разевернется в ошибку: текст + статус 404 НЕ-НАЙДЕНО
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND)
    }
    //если пройдем ниже if статус будет дефолтный 200
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId)
  }
}
