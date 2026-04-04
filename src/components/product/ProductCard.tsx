import useCart from "@/data/hooks/useCart";
import Product from "@/data/model/Product";
import Image from "next/image";

export interface ProductCardProps {
    product: Product;
}

export default function ProductCard(props: ProductCardProps) {
    const { add } = useCart();
    const { name, description, price, image } = props.product;

    return (
        <div className="group flex flex-col bg-[var(--surface)] rounded-2xl overflow-hidden border border-[var(--border)] hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all duration-300 w-72">
            <div className="relative w-full h-56 overflow-hidden bg-[var(--surface-3)]">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-white/50 hover:bg-white transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-3 p-5 flex-1">
                <div className="flex-1">
                    <h2 className="font-semibold text-[var(--text-primary)] text-base leading-tight">{name}</h2>
                    <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">{description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                    <div>
                        <p className="text-xs text-[var(--text-muted)]">por</p>
                        <p className="text-lg font-semibold text-[var(--text-primary)]">
                            R$ {price.toFixed(2)}
                        </p>
                    </div>
                    <button
                        onClick={() => add(props.product)}
                        className="flex items-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-200 active:scale-95"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
}
