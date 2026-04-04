"use client";
import { CartProvider } from "@/data/contexts/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <CartProvider>{children}</CartProvider>;
}
