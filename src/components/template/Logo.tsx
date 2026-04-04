import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[var(--brand)] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                        d="M3 14L9 4L15 14H3Z"
                        fill="white"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <span
                className="text-[var(--text-primary)] font-semibold text-lg tracking-tight"
                style={{ fontFamily: "var(--font-body)" }}
            >
                siquara
                <span className="text-[var(--brand)]">.</span>
            </span>
        </Link>
    );
}
