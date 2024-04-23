export interface Variant {
  id: number;
  name: string;
  images: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imgSrc: string;
  variants: Variant[];
}