"use client";
import Link from "next/link";
import useCart from "@/data/hooks/useCart";
import CartItem from "@/data/model/CartItem";
import { useDeals } from "@/data/contexts/DealsContext";

export interface CartTotalProps {
    items: CartItem[];
}

export default function CartTotal(props: CartTotalProps) {
    const { clear } = useCart();
    const { dealIds } = useDeals();
    const subtotal = props.items.reduce((acc, item) => {
        const onSale = dealIds.has(item.product.id);
        const discountedPrice =
            onSale && item.product.discountPercentage > 0
                ? item.product.price *
                  (1 - item.product.discountPercentage / 100)
                : item.product.price;
        return acc + discountedPrice * item.quantity;
    }, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6">
            <h2 className="font-semibold text-[var(--text-primary)] text-lg mb-4">
                Order summary
            </h2>

            <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Subtotal</span>
                    <span>$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Shipping</span>
                    <span className="text-[var(--success)] font-medium">
                        Free
                    </span>
                </div>
                <div className="border-t border-[var(--border)] pt-3 flex justify-between">
                    <span className="font-semibold text-[var(--text-primary)]">
                        Total
                    </span>
                    <span className="font-bold text-xl text-[var(--brand)]">
                        $ {total.toFixed(2)}
                    </span>
                </div>
            </div>

            <Link
                href="/checkout"
                className="mt-5 w-full bg-[var(--brand)] hover:bg-[var(--brand-dark)] active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm text-center block"
            >
                Checkout →
            </Link>

            <button
                onClick={clear}
                className="mt-2 w-full text-sm text-[var(--text-muted)] hover:text-red-500 transition-colors py-2"
            >
                Clear cart
            </button>
        </div>
    );
}
