import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { PuppeteerModule } from 'nest-puppeteer';
import { ScrapingService } from './scraping/scraping.service';
import { SearchService } from './search/search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchSchema } from './search/search.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      {
        name: 'Search',
        schema: SearchSchema,
      },
    ]),
    PuppeteerModule.forRoot(),
  ],
  controllers: [ProductsController],
  providers: [ScrapingService, SearchService],
})
export class AppModule {}
