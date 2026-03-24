import type { FormikProps } from "formik";

import type { UserInfo } from "@/types/order";
import styles from "@/components/CheckoutForm/CheckoutForm.module.css";

type CheckoutFormProps = {
  formik: FormikProps<UserInfo>;
};

export const CheckoutForm = ({ formik }: CheckoutFormProps) => {
  return (
    <section className={styles.panel}>
      <h2 className={styles.title}>Delivery Details</h2>
      <div className={styles.fields}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          placeholder="Anna Kovalenko"
        />
        {formik.touched.name && formik.errors.name ? (
          <p className={styles.error}>{formik.errors.name}</p>
        ) : null}

        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          placeholder="anna.kovalenko@example.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className={styles.error}>{formik.errors.email}</p>
        ) : null}

        <label className={styles.label} htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          placeholder="+380671234567"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className={styles.error}>{formik.errors.phone}</p>
        ) : null}

        <label className={styles.label} htmlFor="address">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          placeholder="45 Shevchenka Ave, Lviv, Ukraine"
        />
        {formik.touched.address && formik.errors.address ? (
          <p className={styles.error}>{formik.errors.address}</p>
        ) : null}
      </div>
    </section>
  );
};
