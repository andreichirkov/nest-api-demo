import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModel } from './auth.model';

@Module({
  controllers: [AuthController],
  imports: [
    //передаем информацию о моделях которую будем использовать
    TypegooseModule.forFeature([
      {
        //класс который будет отвечать за модель
        typegooseClass: AuthModel,

        //дополнительные опции схемы которые можно передать
        schemaOptions: {
          //какая коллекция будет использоваться для хранения данных этой модели
          collection: 'Auth'
        }
      }
    ])
  ]
})
export class AuthModule {}
