import useCart from "@/data/hooks/useCart";
import CartItem from "@/data/model/CartItem";

export interface CartTotalProps {
    items: CartItem[];
}

export default function CartTotal(props: CartTotalProps) {
    const { clear } = useCart();
    const total = props.items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    );

    return (
        <div className="flex items-center justify-between bg-zinc-900 rounded-md p-7">
            <div className="flex flex-col justify-between">
                <span className="text-zinc-500">Total</span>
                <span className="text-3xl font-bold text-yellow-500">
                    R$ {total.toFixed(2)}
                </span>
            </div>
            <button
                onClick={() => clear()}
                className="bg-green-600 rounded-md px-4 py-2 text-xl"
            >
                Checkout
            </button>
        </div>
    );
}
