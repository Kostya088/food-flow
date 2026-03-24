"use client";

import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";

import { CartItemsList } from "@/components/CartItemsList/CartItemsList";
import { CheckoutForm } from "@/components/CheckoutForm/CheckoutForm";
import { createOrder } from "@/lib/api/client/orders";
import { getCartTotal, useCartStore } from "@/lib/store/cartStore";
import type { CreateOrderPayload, UserInfo } from "@/types/order";
import styles from "@/components/CartPage/CartPage.module.css";

const validationSchema: yup.ObjectSchema<UserInfo> = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Name is too short")
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .trim()
    .matches(
      /^\+?[0-9]{10,15}$/,
      "Phone must have 10-15 digits and may start with +",
    )
    .required("Phone is required"),
  address: yup
    .string()
    .trim()
    .min(6, "Address is too short")
    .required("Address is required"),
});

export const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = getCartTotal(items);

  const orderMutation = useMutation({
    mutationFn: createOrder,
  });

  const formik = useFormik<UserInfo>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      if (items.length === 0) {
        helpers.setStatus({
          type: "error",
          message: "Your cart is empty. Add at least one product.",
        });
        return;
      }

      const now = new Date().toISOString();
      const payload: CreateOrderPayload = {
        user: values,
        items: items.map((item) => ({
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          price: item.price,
        })),
        totalPrice,
        createdAt: { $date: now },
        updatedAt: { $date: now },
      };

      try {
        await orderMutation.mutateAsync(payload);
        clearCart();
        helpers.resetForm();
        helpers.setStatus({
          type: "success",
          message: "Order submitted successfully!",
        });
      } catch {
        helpers.setStatus({
          type: "error",
          message: "Failed to submit order. Please try again.",
        });
      }
    },
  });

  return (
    <form className={styles.layout} onSubmit={formik.handleSubmit}>
      <CheckoutForm formik={formik} />
      <section className={styles.cartPanel}>
        <h2 className={styles.title}>Shopping Cart</h2>
        <CartItemsList
          items={items}
          onChangeQuantity={setQuantity}
          onRemove={removeItem}
        />
        <div className={styles.summary}>
          <p className={styles.total}>Total price: {totalPrice} UAH</p>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={orderMutation.isPending}
          >
            {orderMutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
        {formik.status?.message ? (
          <p
            className={
              formik.status.type === "success" ? styles.success : styles.error
            }
          >
            {formik.status.message}
          </p>
        ) : null}
      </section>
    </form>
  );
};
