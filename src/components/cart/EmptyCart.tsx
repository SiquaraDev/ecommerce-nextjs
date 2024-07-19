import { IconShoppingCartOff } from "@tabler/icons-react";
import Link from "next/link";

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center gap-4 text-zinc-500">
            <IconShoppingCartOff size={150} stroke={0.5} />
            <div className="flex flex-col items-center">
                <h2 className="text-3xl">Seu carrinho está vazio</h2>
                <p>Adicione itens ao seu carrinho para vê-los aqui.</p>
            </div>
            <Link
                href="/"
                className="bg-green-600 text-white rounded-sm px-2 py-1"
            >
                Ver Produtos
            </Link>
        </div>
    );
}
