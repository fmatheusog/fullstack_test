import { Injectable } from '@nestjs/common';
import { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';
import { filters } from './interfaces/filters.interface';
import { product } from './interfaces/product.interface';

// https://lista.mercadolivre.com.br/eletronicos-audio-video/televisores/
// https://lista.mercadolivre.com.br/eletrodomesticos/refrigeracao/
// https://lista.mercadolivre.com.br/celulares-telefones/celulares-smartphones/

// https://www.buscape.com.br/tv
// https://www.buscape.com.br/geladeira
// https://www.buscape.com.br/celular

// Sources - 1. All 2. ML 3. Buscapé
// Categories - 1. All 2. TV 3. Geladeira 4. Celular

@Injectable()
export class ScrapingService {
  constructor(
    @InjectContext() private readonly browserContext: BrowserContext,
  ) {}

  private async getMLProducts(
    category: string,
    searchString: string,
  ): Promise<{ data: product[] }> {
    const baseURL = 'https://lista.mercadolivre.com.br';

    const categoryLinks = {
      tv: '/eletronicos-audio-video/televisores/',
      geladeira: '/eletrodomesticos/refrigeracao/',
      celular: '/celulares-telefones/celulares-smartphones/',
    };

    // Inicializa a página
    const page = await this.browserContext.newPage();
    await page.goto(`${baseURL}${categoryLinks[category]}`);

    // Marca a opção de buscar somente dentro da categoria
    await page.click('#categorySearch');

    // Captura elemento input pra pesquisa e digita o valor da searchString
    await page.type('.nav-search-input', searchString);
    await page.keyboard.press('Enter');

    // Aguarda navegação pra página com os resultados
    await page.waitForNavigation();

    try {
      const links: string[] = await page.evaluate(() => {
        const cards = document.getElementsByClassName(
          'ui-search-item__group__element shops__items-group-details ui-search-link',
        );

        const n = [];

        for (let i = 0; i < cards.length; i++) {
          n.push(cards.item(i).getAttribute('href'));
        }

        return n;
      });

      const data: product[] = [];

      for (let i = 0; i < links.length; i++) {
        page.goto(links[i]);

        await page.waitForNavigation();

        console.log(page.url());

        const product = await page.evaluate(() => {
          // Pegar os valores das informações (nome, preço, imagem)
          const name = document.querySelector(
            '.ui-pdp-header__title-container',
          ).textContent;

          const price = document.querySelector(
            '.andes-money-amount__fraction',
          ).textContent;

          const priceCents = document.querySelector(
            '.andes-money-amount__cents',
          ).textContent;

          const image = document
            .querySelector('.ui-pdp-gallery__figure > img')
            .getAttribute('src');

          return {
            name,
            price: `R$ ${price},${priceCents}`,
            image,
          };
        });

        data.push({
          url: page.url(),
          name: product.name,
          price: product.price,
          image: product.image,
          source: 'Mercado Livre',
        });
      }

      return {
        data,
      };
    } catch (error) {
      // TODO: Refatorar error handling
      console.log(error);

      return {
        data: [],
      };
    }
  }

  private async getBuscapeProducts(
    category: string,
    searchString: string,
  ): Promise<{ data: product[] }> {
    const baseURL = 'https://www.buscape.com.br';

    // Inicializa a página
    const page = await this.browserContext.newPage();
    await page.goto(baseURL);

    // Captura elemento input pra pesquisa e digita o valor da searchString
    await page.type('input[type=search]', `${category} ${searchString}`);
    await page.keyboard.press('Enter');

    // Aguarda navegação pra página com os resultados
    await page.waitForNavigation();

    try {
      const links: string[] = await page.evaluate(() => {
        const cards = document.getElementsByClassName(
          'SearchCard_ProductCard_Inner__7JhKb',
        );

        const n = [];

        for (let i = 0; i < cards.length; i++) {
          n.push(cards.item(i).getAttribute('href'));
        }

        return n;
      });

      const data: product[] = [];

      for (let i = 0; i < links.length; i++) {
        if (links[i].startsWith('/')) {
          page.goto(`${baseURL}${links[i]}`);
        } else {
          continue;
        }

        await page.waitForNavigation();

        const product = await page.evaluate(() => {
          try {
            const name =
              document.querySelector('.Title_Name__qQvSr').textContent;

            const price = document.querySelector(
              '.Price_ValueContainer__1U9ia',
            ).textContent;

            const image = document
              .querySelector('.Carousel_SlideItem__c7xrN > img')
              .getAttribute('src');

            return {
              name,
              price,
              image,
            };
          } catch (error) {
            console.log('erro no produto');
          }
        });

        data.push({
          url: page.url(),
          name: product.name,
          price: product.price,
          image: product.image,
          source: 'Buscapé',
        });
      }

      return {
        data,
      };
    } catch (error) {
      // TODO: Refatorar error handling
      console.log(error);

      return {
        data: [],
      };
    }
  }

  async getProducts(params: filters) {
    // Validação das possíveis combinações de filtros de busca
    const actions = {
      all: async (
        category: string,
        searchString: string,
      ): Promise<product[]> => {
        const ml = await this.getMLProducts(category, searchString);
        const bs = await this.getBuscapeProducts(category, searchString);

        return [...ml.data, ...bs.data];
      },
      buscape: (category: string, searchString: string) => {
        return this.getBuscapeProducts(category, searchString);
      },
      ml: (category: string, searchString: string) => {
        return this.getMLProducts(category, searchString);
      },
    };

    // Aciona a ação de acordo com a source
    if (actions.hasOwnProperty(params.source)) {
      return actions[params.source](params.category, params.searchString);
    }

    return;
  }
}
