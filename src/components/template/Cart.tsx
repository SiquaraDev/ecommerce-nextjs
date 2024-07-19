import Link from "next/link";
import { IconShoppingCart } from "@tabler/icons-react";
import useCart from "@/data/hooks/useCart";

export default function Cart() {
    const { itemsQuantity } = useCart();

    return (
        <Link href="/cart">
            <div className="flex relative">
                <IconShoppingCart size={32} stroke={1} />
                {itemsQuantity ? (
                    <div className="absolute w-6 h-6 bg-red-500 rounded-full -top-2.5 -right-2.5 flex justify-center items-center text-xs">
                        {itemsQuantity}
                    </div>
                ) : null}
            </div>
        </Link>
    );
}
