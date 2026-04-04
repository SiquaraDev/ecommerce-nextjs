"use client";
import CartItem from "@/data/model/CartItem";
import Image from "next/image";

export interface CartItemWidgetProps {
    item: CartItem;
    add: (item: CartItem) => void;
    remove: (item: CartItem) => void;
}

export default function CartItemWidget(props: CartItemWidgetProps) {
    const { item, add, remove } = props;

    return (
        <div className="w-full bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-3 sm:p-4 hover:border-[var(--brand)]/30 transition-colors">
            <div className="flex items-start gap-3">
                {/* Imagem menor no mobile */}
                <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[var(--surface-3)] flex-shrink-0">
                    <Image
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Título e descrição */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm sm:text-base leading-snug line-clamp-2">
                        {item.product.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1 hidden sm:block">
                        {item.product.description}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">
                        R$ {item.product.price.toFixed(2)} × {item.quantity}
                    </p>
                    <p className="font-semibold text-sm text-[var(--brand)] mt-0.5">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Controles abaixo no mobile */}
            <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-[var(--border)]">
                <button
                    onClick={() => remove(item)}
                    className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
                <span className="w-9 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-sm font-semibold text-[var(--text-primary)]">
                    {item.quantity}
                </span>
                <button
                    onClick={() => add(item)}
                    className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] hover:bg-[var(--brand-light)] transition-all"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
