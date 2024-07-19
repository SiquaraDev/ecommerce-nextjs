"use client";
import CartItemWidget from "@/components/cart/CartItemWidget";
import CartTotal from "@/components/cart/CartTotal";
import EmptyCart from "@/components/cart/EmptyCart";
import Page from "@/components/template/Page";
import useCart from "@/data/hooks/useCart";

export default function PageCart() {
    const { items, add, remove } = useCart();
    return (
        <Page>
            {items.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-5">
                        {items.map((item) => (
                            <CartItemWidget
                                key={item.product.id}
                                item={item}
                                add={(item) => add(item.product)}
                                remove={(item) => remove(item.product)}
                            />
                        ))}
                    </div>
                    <CartTotal items={items} />
                </div>
            )}
        </Page>
    );
}
