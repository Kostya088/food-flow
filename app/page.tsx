import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Food Flow",
  description: "Fast food ordering across your favorite shops",
};

export default function Home() {
  redirect("/shop");
}
