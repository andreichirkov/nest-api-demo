export class AuthDto {
  login: string
  password: string //не хеш, а пароль, чтобы сравнить потом с сохраненным хешом
}
