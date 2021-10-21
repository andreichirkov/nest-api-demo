export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products
}

export class TopPageModel {
  //первый уровень категории (курсы, сервисы, книги, товары)
  firstCategory: TopLevelCategory
  //второй уровень категорий (разработка, аналитика, маркетинг)
  secondCategory: string
  title: string
  //катагория страницы? не понял пока что
  category: string
  hh?: {
    count: number
    juniorSalary: number
    middleSalary: number
    seniorSalary: number
  }
  advantages: {
    title: string
    description: string
  }[]
  seoText: string
  tagsTitle: string //? не обязательный мм?
  tags: string[]
}
