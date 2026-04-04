import Link from "next/link";

export default function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[var(--surface-3)] flex items-center justify-center">
                <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--text-muted)]"
                >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                </svg>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                    Seu carrinho está vazio
                </h2>
                <p className="text-[var(--text-muted)] mt-1 text-sm">
                    Explore nossa loja e adicione produtos que você gostou.
                </p>
            </div>

            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
            >
                Ver produtos
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}
