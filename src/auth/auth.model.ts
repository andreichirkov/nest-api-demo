import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

//нельзя экстендиться от двух моделей, поэтому
export interface AuthModel extends Base {}

//модель AuthModel имеет 2 поля + TimeStamps + id и прочее из Base
export class AuthModel extends TimeStamps {

  //любое уникальное поле становится индексом тоже
  @prop({ unique: true })
  email: string

  @prop()
  passwordHash: string
}
