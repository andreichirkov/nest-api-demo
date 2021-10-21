import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
//в этом проекте регистрация нужна только для админов, не пользовательская
export class AuthController {
  //Пост потому что будем передавать в body данные
  //лучше соблюдать название роута с название функций
  //для кода http, при регистрации данные изменяются
  @Post('register')
  async register(@Body() dto: AuthDto) {

  }

  //по умолчанию при пост код 201 (при логине данные не меняются)
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {

  }
}
