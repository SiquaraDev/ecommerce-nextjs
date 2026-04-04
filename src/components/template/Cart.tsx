"use client";
import Link from "next/link";
import useCart from "@/data/hooks/useCart";

export default function Cart() {
    const { itemsQuantity } = useCart();

    return (
        <Link href="/cart">
            <div className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--brand)] transition-all duration-200 group">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--text-secondary)] group-hover:text-[var(--brand)] transition-colors flex-shrink-0"
                >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                <span className="hidden sm:inline text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--brand)] transition-colors">
                    Cart
                </span>
                {itemsQuantity ? (
                    <span className="w-5 h-5 bg-[var(--brand)] rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {itemsQuantity}
                    </span>
                ) : null}
            </div>
        </Link>
    );
}
