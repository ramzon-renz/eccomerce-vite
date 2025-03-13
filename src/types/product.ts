export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  images: string[];
  material: string;
  style: string;
  category: string;
  type: string;
  dimensions: {
    width: number;
    height: number;
    thickness: number;
  };
  features: string[];
  specifications: Record<string, string>;
}

export interface ProductData {
  products: Product[];
}

export interface ProductCardData {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  material: string;
  style: string;
  category: string;
  type: string;
} 