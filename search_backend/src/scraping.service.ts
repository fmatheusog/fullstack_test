import { Injectable } from '@nestjs/common';
import { BrowserContext } from 'puppeteer';
import { InjectContext } from 'nest-puppeteer';

// https://lista.mercadolivre.com.br/eletronicos-audio-video/televisores/
// https://lista.mercadolivre.com.br/eletrodomesticos/refrigeracao/
// https://lista.mercadolivre.com.br/celulares-telefones/celulares-smartphones/

// https://www.buscape.com.br/tv
// https://www.buscape.com.br/geladeira
// https://www.buscape.com.br/celular

// Sources - 1. All 2. ML 3. Buscapé
// Categories - 1. All 2. TV 3. Geladeira 4. Celular

type filters = {
  source: string;
  category: string;
  searchString: string;
};

@Injectable()
export class ScrapingService {
  constructor(
    @InjectContext() private readonly browserContext: BrowserContext,
  ) {}

  // async getMLProducts(category: string, searchString: string) {
  //   console.log('Mercado Livre');
  // };

  private async getBsProducts(category: string, searchString: string) {
    const baseURL = 'https://www.buscape.com.br';

    // Inicializa a página
    const page = await this.browserContext.newPage();
    await page.goto(baseURL);

    // Captura elemento input pra pesquisa
    const searchInput = await page.evaluateHandle(() => {
      return document.querySelector('input[type=search]');
    });

    // Digita valor recebido por parâmetro e realiza busca
    await searchInput.type(`${category} ${searchString}`);
    await searchInput.press('Enter');

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

      type item = {
        url: string;
        name: string;
        price: string;
        image: string;
      };

      const data: item[] = [];

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
        });
      }

      return {
        data,
      };
    } catch (error) {
      console.log(error);
      return {
        data: [],
      };
    }
  }

  async getProducts(params: filters) {
    // Validação das possíveis combinações de filtros de busca
    const actions = {
      //   'all-all': () => {
      //     console.log('');
      //   },
      //   'all-tv': () => {
      //     console.log('');
      //   },
      //   'all-geladeira': () => {
      //     console.log('');
      //   },
      //   'all-celular': () => {
      //     console.log('');
      //   },
      //   'ml-all': () => {
      //     console.log('');
      //   },
      //   'ml-tv': () => {
      //     console.log('');
      //   },
      //   'ml-geladeira': () => {
      //     console.log('');
      //   },
      //   'ml-celular': () => {
      //     console.log('');
      //   },
    };

    const sourceCategoryCombination = `${params.source}-${params.category}`;

    // Se a source for apenas buscapé aciona método específico
    if (params.source == 'bs') {
      return this.getBsProducts(params.category, params.searchString);
    }
    // Se não aciona o método de acordo com a combinação de categorias
    if (actions.hasOwnProperty(sourceCategoryCombination)) {
      return actions[sourceCategoryCombination]();
    }

    return;
  }
}
