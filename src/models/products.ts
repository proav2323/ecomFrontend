import { Catgeory } from './category';
import { Colors } from './colors';
import { Reviews } from './reviews';

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  colors: string[];
  price: number;
  company: string;
  new: boolean;
  onBanner: boolean;
  bannerText?: string;
  cta?: string;
  stock: number;
  categoryId: string;
  category: Catgeory;
  reviews: Reviews[];
}
