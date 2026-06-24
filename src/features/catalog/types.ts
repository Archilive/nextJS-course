export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  specifications: Record<string, string>;
};
