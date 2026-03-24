export type ProductCategory =
  | "burger"
  | "side"
  | "drink"
  | "dessert"
  | "chicken"
  | "main"
  | "sauce"
  | "pizza"
  | (string & {});

export type Product = {
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
};

export type Shop = {
  _id: string;
  name: string;
  rating: number;
  products: Product[];
};

export type LegacyShopId = { $oid: string };

export const getShopId = (id: string | LegacyShopId): string => {
  if (typeof id === "string") {
    return id;
  }

  return id.$oid;
};

export const parseShopRating = (
  rating: number | string | undefined,
): number => {
  if (typeof rating === "number") {
    return Number.isFinite(rating) ? rating : 0;
  }

  if (typeof rating === "string") {
    const parsedRating = Number.parseFloat(rating);
    return Number.isFinite(parsedRating) ? parsedRating : 0;
  }

  return 0;
};
