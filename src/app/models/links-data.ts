import { Pagination } from './pagination';
import { ShortURL } from './short-url';

export interface LinksData {
  links: ShortURL[];
  pagination: Pagination;
}
