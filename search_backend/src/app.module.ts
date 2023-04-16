import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PuppeteerModule } from 'nest-puppeteer';
import { ScrapingService } from './scraping.service';

@Module({
  imports: [PuppeteerModule.forRoot()],
  controllers: [ProductsController],
  providers: [ScrapingService],
})
export class AppModule {}
