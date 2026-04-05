import Link from "next/link";
import Page from "@/components/template/Page";

export default function CheckoutPage() {
    return (
        <Page>
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-6 px-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[var(--surface-3)] flex items-center justify-center">
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[var(--brand)]"
                    >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>

                <div className="flex flex-col gap-2 max-w-md">
                    <p className="text-[var(--brand)] text-xs sm:text-sm font-medium uppercase tracking-widest">
                        Order received
                    </p>
                    <h1
                        className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Thanks for trying it out!
                    </h1>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed mt-1">
                        Glad you explored Siquara Store all the way here. This
                        is a demo project and your &quot;purchase&quot; was
                        successfully recorded. Hope you enjoyed the experience!
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
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
                        Back to home
                    </Link>
                    <Link
                        href="/offers"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[var(--border)] hover:border-[var(--brand)] text-[var(--text-secondary)] hover:text-[var(--brand)] font-medium px-6 py-3 rounded-xl text-sm transition-colors"
                    >
                        View offers
                    </Link>
                </div>
            </div>
        </Page>
    );
}
