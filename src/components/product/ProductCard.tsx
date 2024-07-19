import useCart from "@/data/hooks/useCart";
import Product from "@/data/model/Product";
import { IconPlus, IconShoppingCart } from "@tabler/icons-react";
import Image from "next/image";

export interface ProductCardProps {
    product: Product;
}

export default function ProductCard(props: ProductCardProps) {
    const { add } = useCart();
    const { name, description, price, image } = props.product;
    return (
        <div className="flex flex-col w-72 bg-zinc-900">
            <div className="relative w-72 h-52">
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col gap-4 p-5">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="flex-1 text-sm text-zinc-400">{description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold mt-2">
                        R${price.toFixed(2)}
                    </span>
                    <button
                        onClick={() => add(props.product)}
                        className="flex items-center border rounded-full px-2 py-1"
                    >
                        <IconPlus size={12} />
                        <IconShoppingCart size={24} stroke={1} />
                    </button>
                </div>
            </div>
        </div>
    );
}
