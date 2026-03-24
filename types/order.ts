export type UserInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type OrderItem = {
  name: string;
  category?: string;
  quantity: number;
  price: number;
};

export type MongoDate = {
  $date: string;
};

export type CreateOrderPayload = {
  user: UserInfo;
  items: OrderItem[];
  totalPrice: number;
  createdAt: MongoDate;
  updatedAt: MongoDate;
};
