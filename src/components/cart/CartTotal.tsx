"use client";
import useCart from "@/data/hooks/useCart";
import CartItem from "@/data/model/CartItem";

export interface CartTotalProps {
    items: CartItem[];
}

export default function CartTotal(props: CartTotalProps) {
    const { clear } = useCart();
    const subtotal = props.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
    );
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6">
            <h2 className="font-semibold text-[var(--text-primary)] text-lg mb-4">
                Resumo do pedido
            </h2>

            <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Subtotal</span>
                    <span>$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Frete</span>
                    <span className="text-[var(--success)] font-medium">
                        Grátis
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

            <button className="mt-5 w-full bg-[var(--brand)] hover:bg-[var(--brand-dark)] active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm">
                Finalizar compra →
            </button>

            <button
                onClick={clear}
                className="mt-2 w-full text-sm text-[var(--text-muted)] hover:text-red-500 transition-colors py-2"
            >
                Esvaziar carrinho
            </button>
        </div>
    );
}
