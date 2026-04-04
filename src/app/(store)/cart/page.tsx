"use client";
import CartItemWidget from "@/components/cart/CartItemWidget";
import CartTotal from "@/components/cart/CartTotal";
import EmptyCart from "@/components/cart/EmptyCart";
import Page from "@/components/template/Page";
import useCart from "@/data/hooks/useCart";
import Link from "next/link";

export default function PageCart() {
    const { items, add, remove } = useCart();
    return (
        <Page>
            <div className="mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Continuar comprando
                </Link>
                <h1 className="text-2xl font-semibold text-[var(--text-primary)] mt-2">
                    Meu carrinho
                    {items.length > 0 && (
                        <span className="text-sm font-normal text-[var(--text-muted)] ml-2">
                            ({items.length}{" "}
                            {items.length === 1 ? "item" : "itens"})
                        </span>
                    )}
                </h1>
            </div>

            {items.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    <div className="flex-1 flex flex-col gap-3 w-full min-w-0">
                        {items.map((item) => (
                            <CartItemWidget
                                key={item.product.id}
                                item={item}
                                add={(item) => add(item.product)}
                                remove={(item) => remove(item.product)}
                            />
                        ))}
                    </div>
                    <div className="w-full lg:w-80 lg:sticky lg:top-24">
                        <CartTotal items={items} />
                    </div>
                </div>
            )}
        </Page>
    );
}
