import { Injectable } from '@nestjs/common';
import { ReviewModel } from './review.model';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { CreateReviewDto } from './dto/create-review.dto';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class ReviewService {
  //модель нужно заинжектить в ReviewService
  //после доступны все методы работы с моделью (сохранение, создание и тд)
  constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {}

  //тут в ревью на основании dto нужно мочь создать в БД записть
  //из контроллер create будет вызываться сервис create
  //код похож, но это правильная архитектура сервисов в целом
  //логикаа работы с БД не должна мешаться с бизнес-логикой, пока что это только CRUD
  async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
    //ВОТ ЭТОТ ДОСТУП ДО ReviewModel
    //в хороших API должен вернуть полную созданную модель DocumentType c generic ReviewModel
     return this.reviewModel.create(dto)
  }

  //null если такого айди нету (доп обработка будет в контроллере)
  async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
    return this.reviewModel.findByIdAndDelete(id).exec()
  }

  //ищем по одному productId несколько отзывов (или 1) вернет массив документов
  async findByProductId(productId: string): Promise<DocumentType<ReviewModel>[]> {
    return this.reviewModel.find({  productId: Types.ObjectId(productId) }).exec()
  }

  //удалить все отзывы, если удален продукт
  async deleteByProductId(productId: string) {
    //productId: Types.ObjectId(productId) - это productId сконвертированный к его типу
    return this.reviewModel.deleteMany({ productId: Types.ObjectId(productId) }).exec()
  }
}
