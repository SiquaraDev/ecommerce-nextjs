import CartItem from "@/data/model/CartItem";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import Image from "next/image";

export interface CartItemWidgetProps {
    item: CartItem;
    add: (item: CartItem) => void;
    remove: (item: CartItem) => void;
}

export default function CartItemWidget(props: CartItemWidgetProps) {
    const { item, add, remove } = props;

    return (
        <div className="flex items-center gap-5 bg-zinc-900 rounded-md overflow-hidden">
            <div className="relative w-28 h-28">
                <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col justify-center flex-1">
                <span className="text-xl font-bold">{item.product.name}</span>
                <span className="text-sm text-zinc-400">
                    {item.product.description}
                </span>
                <div className="flex items-center gap-2 mt-2 text-zinc-400 text-lg font-bold">
                    <span>R$ {item.product.price.toFixed(2)}</span>
                    <IconX size={20} />
                    <span>{item.quantity}</span>
                    <span>=</span>
                    <span className="text-yellow-500">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 items-center px-5">
                <button
                    onClick={() => {
                        remove(item);
                    }}
                >
                    <IconMinus />
                </button>
                <span className="flex px-4 py-2 rounded-md bg-black">
                    {item.quantity}
                </span>
                <button onClick={() => add(item)}>
                    <IconPlus />
                </button>
            </div>
        </div>
    );
}
