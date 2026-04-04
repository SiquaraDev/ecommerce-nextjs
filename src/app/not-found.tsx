import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[var(--surface-3)] flex items-center justify-center">
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
                    <circle cx="12" cy="12" r="10" />
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
            </div>

            <div>
                <p className="text-[var(--brand)] text-xs sm:text-sm font-medium uppercase tracking-widest mb-2">
                    Error 404
                </p>
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    Page not found
                </h1>
                <p className="text-[var(--text-muted)] mt-3 text-sm max-w-xs mx-auto leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <Link
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Go home
                </Link>
                <Link
                    href="/categories"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[var(--border)] hover:border-[var(--brand)] text-[var(--text-secondary)] hover:text-[var(--brand)] font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                >
                    Browse categories
                </Link>
            </div>
        </div>
    );
}
