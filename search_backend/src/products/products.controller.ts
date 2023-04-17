import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ScrapingService } from '../scraping/scraping.service';
import { filters } from '../interfaces/filters.interface';
import { SearchService } from 'src/search/search.service';
import { product } from 'src/interfaces/product.interface';

@Controller('/products')
export class ProductsController {
  constructor(
    private readonly scraping: ScrapingService,
    private readonly searchs: SearchService,
  ) {}

  @Post()
  @HttpCode(200)
  async getProducts(@Body() payload: filters) {
    const { source, category, searchString } = payload;

    // 1. Realizar busca no banco de dados
    const databaseResults = await this.searchs.findByFilters(payload);
    // 2. Caso exista uma busca com os mesmos parametros
    // -> retornar os produtos dessa busca do banco de dados
    if (databaseResults) return { data: databaseResults.products };
    // 3. Caso não exista a mesma busca
    // -> realizar web scraping pra buscar os produtos com os parametros corretos
    const result: { data: product[] } = await this.scraping.getProducts({
      source,
      category,
      searchString,
    });

    this.searchs.create({ filters: payload, products: result.data });

    return result;
  }
}
