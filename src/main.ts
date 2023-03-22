import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger'
import { SwaggerService } from './services/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Wahab NEST Example')
  .setDescription('setting Up the Nest App for Testing Purpose.')
  .setVersion('1.0')
  .setContact('Abdul Wahab', 'https://github.com/ab958', 'abwahab958@gmail.com')
  // .addTag('WAHAB')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  new SwaggerService('api', app, config).init();
  SwaggerModule.setup('api', app, document)

  let description = Object.values(SwaggerModule.createDocument(app,config).paths)
  // console.log(document)
  // description.forEach((item: any) => {
  //   item =  Object.values(item)
  //   item.forEach(element => {
  //     console.log('Description of Route is ','===> ',element.description)
  //   });
  // }) 
  await app.listen(3000);
}
bootstrap();
