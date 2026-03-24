import { apiClient } from "@/lib/api/client/http";
import type { CreateOrderPayload } from "@/types/order";

export const createOrder = async (
  payload: CreateOrderPayload,
): Promise<void> => {
  await apiClient.post("/orders", payload);
};
