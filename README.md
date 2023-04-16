# Full-stack test

## Description

Create a product search engine that connects to the Mercado Livre and Buscapé pages.

## Project details

- Through a drop-down menu we can choose the categories: Mobile, Refrigerator, TV.
- Through a drop-down menu we can choose the site: Mercado Livre / Buscapé
- Create a free text entry to search for products
- After searching the list of products that will appear on the screen with: Photo, description, category, price and website where the information was obtained
- Store results in database after user search. If you repeat the same search (only take into account the category and web filters to store), show what leaves the base and don't undo it for the webs.
- Host the solution online on a free server like heroku or some other alternative. 

## Used technologies

- Typescript
- NextJS
- NestJS
- MongoDB
- Mongoose

## TO-DO list:

- [x] Initialize local repository
- [x] Create github repository
- [x] Create dev branch
- [x] Create Next project
- [x] Create NestJS project
- [x] Create database (MongoDB Atlas)
- [x] Next enviroment configuration
- [x] Nest enviroment configuration
- [x] App layout
- [ ] Mongoose configuration
- [ ] API endpoint for storing search results and getting products info
- [ ] Scraping methods
  - [x] Buscapé scraping
  - [ ] Mercado livre scraping
- [ ] Change endpoint from GET to POST
- [ ] APIs integration
- [ ] Tests
- [ ] Deploy