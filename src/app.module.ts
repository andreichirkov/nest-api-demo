import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //подключаемся к БД, чтобы был доступен конфиг forRootAsync

    TypegooseModule.forRootAsync({
      //чтобы использовать любой провайдер - нужно импортировать модуль которой содержит этот провайдер
      imports: [ConfigModule],
      //в этот фэктоори который будет работать нужно заинжектировать какую то зависимость,
      //из модуля который импортировали
      inject: [ConfigService],
      useFactory: getMongoConfig
    }),

    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule
  ],
})

export class AppModule {}
