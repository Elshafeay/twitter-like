import { NestFactory } from '@nestjs/core';
import { AppModule } from './Modules/app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { logger: false });
	await app.listen(3000);
}
bootstrap();
