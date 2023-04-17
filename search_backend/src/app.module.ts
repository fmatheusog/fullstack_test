import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { PuppeteerModule } from 'nest-puppeteer';
import { ScrapingService } from './scraping/scraping.service';
import { SearchService } from './search/search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchSchema } from './search/search.schema';

@Module({
  imports: [
    PuppeteerModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([
      {
        name: 'Search',
        schema: SearchSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ScrapingService, SearchService],
})
export class AppModule {}
