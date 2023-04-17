import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { search } from '../interfaces/search.interface';
import { filters } from 'src/interfaces/filters.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel('Search') private readonly searchModel: Model<search>,
  ) {}

  async create(payload: search): Promise<search> {
    const newSearch = new this.searchModel(payload);
    return newSearch.save();
  }

  async findByFilters(payload: filters): Promise<search> {
    const result = await this.searchModel
      .findOne({
        filters: payload,
      })
      .exec();

    return result;
  }
}
