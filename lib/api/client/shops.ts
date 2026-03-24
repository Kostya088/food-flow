import { apiClient } from "@/lib/api/client/http";
import {
  getShopId,
  parseShopRating,
  type Product,
  type Shop,
} from "@/types/shop";

type RawShop = {
  _id: string | { $oid: string };
  name: string;
  rating?: number | string;
  products: Array<{
    name: string;
    price: number;
    category?: string;
    image: string;
  }>;
};

const normalizeProduct = (product: RawShop["products"][number]): Product => {
  return {
    name: product.name,
    price: product.price,
    category: product.category ?? "other",
    image: product.image,
  };
};

const normalizeShop = (shop: RawShop): Shop => {
  return {
    _id: getShopId(shop._id),
    name: shop.name,
    rating: parseShopRating(shop.rating),
    products: shop.products.map(normalizeProduct),
  };
};

export const fetchShops = async (): Promise<Shop[]> => {
  const response = await apiClient.get<RawShop[]>("/shops");
  return response.data.map(normalizeShop);
};
