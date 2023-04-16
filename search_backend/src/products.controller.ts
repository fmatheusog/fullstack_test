import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { filters } from './interfaces/filters.interface';

@Controller('/products')
export class ProductsController {
  constructor(private readonly scraping: ScrapingService) {}

  @Post()
  @HttpCode(200)
  async getProducts(@Body() payload: filters) {
    // 1. Realizar busca no banco de dados
    // 2. Caso exista uma busca com os mesmos parametros
    // -> retornar os produtos dessa busca do banco de dados
    // 3. Caso não exista a mesma busca
    // -> realizar web scraping pra buscar os produtos com os parametros corretos
    const { source, category, searchString } = payload;
    const result = await this.scraping.getProducts({
      source,
      category,
      searchString,
    });

    return result;
  }
}
