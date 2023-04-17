import * as mongoose from 'mongoose';

export const SearchSchema = new mongoose.Schema({
  filters: {
    source: String,
    category: String,
    searchString: String,
  },
  products: [
    {
      name: String,
      price: String,
      image: String,
      source: String,
      url: String,
    },
  ],
});
