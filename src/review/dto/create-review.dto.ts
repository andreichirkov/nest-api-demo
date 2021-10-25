export class CreateReviewDto {
  name: string
  title: string
  description: string
  rating: number

  //на фронте не нужно конвертировать в ObjectId, поэтому просто строка
  productId: string
}
