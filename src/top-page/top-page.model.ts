import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

export class HhData {
  @prop()
  count: number

  @prop()
  juniorSalary: number

  @prop()
  middleSalary: number

  @prop()
  seniorSalary: number
}

export class TopPageAdvantage {
  @prop()
  title: string

  @prop()
  description: string
}

export interface TopPageModel extends Base {}
export class TopPageModel extends TimeStamps{


  //первый уровень категории (курсы, сервисы, книги, товары)
  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory

  //второй уровень категорий (разработка, аналитика, маркетинг)
  @prop()
  secondCategory: string

  //алиас - уникальный урл по которому будет открываться страница
  @prop({ unique: true })
  alias: string

  @prop()
  title: string

  //катагория страницы? не понял пока что
  @prop()
  category: string

  @prop({ type: () => [HhData] })
  hh?: HhData

  @prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[]

  @prop()
  seoText: string

  @prop()
  tagsTitle: string //? не обязательный мм?

  @prop({ type: () => [String] })
  tags: string[]
}
