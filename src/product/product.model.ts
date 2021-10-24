import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

class ProductCharacteristic {
  @prop()
  name: string

  @prop()
  value: string
}

export interface ProductModel extends Base {}
export class ProductModel extends TimeStamps {

  @prop()
  image: string

  @prop()
  title: string

  @prop()
  price: number

  @prop()
  oldPrice: number

  @prop()
  credit: number

  @prop()
  calculatedRating: number

  @prop()
  description: string

  @prop()
  advantages: string

  @prop()
  disAdvantages: string

  //явное указание типа - массив сторок (через функцию)(тут с большой буквы для тайпГуза)
  @prop({ type: () => [String] })
  categories: string[]

  @prop({ type: () => [String] })
  tags: string


  // characteristics: {
  //   // [key: string]: string //неограниченное число хар-тик ключ значение?????
  // }

  //id для каждого элемента массива хар-тик не нужен
  @prop({ type: () => [ProductCharacteristic], _id: false })
  characteristics: ProductCharacteristic[]
}
