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
        <div className="flex items-center gap-5 bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-4 hover:border-[var(--brand)]/30 transition-colors">
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[var(--surface-3)] flex-shrink-0">
                <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[var(--text-primary)] text-base truncate">
                    {item.product.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-0.5 line-clamp-1">
                    {item.product.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-[var(--text-muted)]">
                        R$ {item.product.price.toFixed(2)} × {item.quantity}
                    </span>
                    <span className="text-[var(--text-muted)]">·</span>
                    <span className="font-semibold text-[var(--brand)]">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
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
