"use client";
import { CartProvider } from "@/data/contexts/CartContext";
import { SearchProvider } from "@/data/contexts/SearchContext";
import { DealsProvider } from "@/data/contexts/DealsContext";

export default function Providers({
    children,
    dealIds,
}: {
    children: React.ReactNode;
    dealIds: number[];
}) {
    return (
        <DealsProvider dealIds={dealIds}>
            <SearchProvider>
                <CartProvider>{children}</CartProvider>
            </SearchProvider>
        </DealsProvider>
    );
}
