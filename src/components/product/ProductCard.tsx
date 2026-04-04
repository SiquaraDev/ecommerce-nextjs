"use client";
import useCart from "@/data/hooks/useCart";
import Product from "@/data/model/Product";
import Image from "next/image";

export interface ProductCardProps {
    product: Product;
}

export default function ProductCard(props: ProductCardProps) {
    const { add } = useCart();
    const { title, description, price, thumbnail } = props.product;

    return (
        <div className="group flex flex-col bg-[var(--surface)] rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 transition-all duration-300">
            {/* Imagem */}
            <div className="relative w-full aspect-square overflow-hidden bg-[var(--surface-3)]">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Conteúdo */}
            <div className="flex flex-col p-4 flex-1 gap-2">
                <h2 className="font-semibold text-[var(--text-primary)] text-sm leading-snug line-clamp-2">
                    {title}
                </h2>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed flex-1">
                    {description}
                </p>

                {/* Preço + botão */}
                <div className="pt-3 mt-1 border-t border-[var(--border)] flex items-center justify-between gap-2">
                    <p className="text-base font-bold text-[var(--text-primary)] whitespace-nowrap">
                        R$ {price.toFixed(2)}
                    </p>
                    <button
                        onClick={() => add(props.product)}
                        className="flex items-center justify-center gap-1 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white font-semibold px-2 py-2 rounded-xl transition-all duration-200 active:scale-95 min-w-0"
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="flex-shrink-0"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span className="hidden sm:inline text-xs">
                            Adicionar
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
