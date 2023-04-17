import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { PuppeteerModule } from 'nest-puppeteer';
import { ScrapingService } from './scraping/scraping.service';

@Module({
  imports: [PuppeteerModule.forRoot()],
  controllers: [ProductsController],
  providers: [ScrapingService],
})
export class AppModule {}
