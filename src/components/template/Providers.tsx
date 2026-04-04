"use client";
import { CartProvider } from "@/data/contexts/CartContext";
import { SearchProvider } from "@/data/contexts/SearchContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SearchProvider>
            <CartProvider>{children}</CartProvider>
        </SearchProvider>
    );
}
