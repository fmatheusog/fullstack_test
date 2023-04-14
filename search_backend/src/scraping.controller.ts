import { Controller, Get, Query } from '@nestjs/common';
import { ScrapingService } from './scraping.service';

@Controller('/products')
export class ScrapingController {
  constructor(private readonly scraping: ScrapingService) {}

  @Get()
  async getProducts(
    @Query('source') source: string,
    @Query('category') category: string,
    @Query('searchString') searchString: string,
  ) {
    // 1. Realizar busca no banco de dados
    // 2. Caso exista uma busca com os mesmos parametros
    // -> retornar os produtos dessa busca do banco de dados
    // 3. Caso não exista a mesma busca
    // -> realizar web scraping pra buscar os produtos com os parametros corretos
    const result = await this.scraping.getProducts({
      source,
      category,
      searchString,
    });

    return result;
  }
}
