import { Module } from '@nestjs/common';
import { ScrapingController } from './scraping.controller';
import { PuppeteerModule } from 'nest-puppeteer';
import { ScrapingService } from './scraping.service';

@Module({
  imports: [PuppeteerModule.forRoot()],
  controllers: [ScrapingController],
  providers: [ScrapingService],
})
export class AppModule {}
