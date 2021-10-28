import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';

const productId = new Types.ObjectId().toHexString()

const testDto: CreateReviewDto = {
	name: 'тест',
	title: 'заголовок',
	description: 'descr',
	rating: 5,
	productId
}

//describe описывает группу тестов
describe('AppController (e2e)', () => {
	//целиком приложение которое инициализируется
	let app: INestApplication
	let createdId: string

	//beforeEach выполняет код каждый раз перед запуском теста
	//то есть ПЕРЕД КАЖДЫМ IT выполнится
	//beforeAll например будет выполняться перед всем
	//afterEach после каждого IT, afterAll после всех выполненных тестов
	beforeEach(async () => {
		//создается тестовый модуль,
		//для unit тестов импортируется только один сервис или контроллер
		//здесь же иморт целиком AppModule
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	//it описывает один конкретный кейс теста
	it('/review/create (POST)', async (done) => {
		//request идет вместе с nest и позволяет удобно тестировать роуты
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201)
			//вытащим из респонса сразу боди, тк then, то главная функция стала промисом
			.then(({ body }: request.Response) => {
				createdId = body._id
				// tslint:disable-next-line:no-console
				// console.log('123', body)
				//надо проверить что ответ не undefined, поэтому будем ожидать
				expect(createdId).toBeDefined()
				done()
			})
	})

	it('/review/byProduct/:productId (get)', async (done) => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				// tslint:disable-next-line:no-console
				console.log('456', body)
				//создали отзыв и получили ответ массив с 1 созданным отзывом
				expect(body.length).toBe(1)
				done()
		})
	})

	it('/review/:id (delete)',  () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.expect(200)
	})

	afterAll(()  => {
		disconnect()
	})
})
