"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSearch } from "@/data/contexts/SearchContext";
import useTheme from "@/data/hooks/useTheme";

import Cart from "./Cart";
import Logo from "./Logo";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/categories", label: "Categories" },
    { href: "/offers", label: "Offers" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { query, setQuery } = useSearch();
    const [searchOpen, setSearchOpen] = useState(false);
    const pathname = usePathname();
    const isCartPage = pathname === "/cart";
    const { dark, toggle } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--border)]">
            <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Logo />

                {/* Nav desktop */}
                <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--text-secondary)]">
                    {navLinks.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            className={`transition-colors pb-0.5 ${
                                pathname === href
                                    ? "text-[var(--text-primary)] font-semibold border-b-2 border-[var(--brand)]"
                                    : "hover:text-[var(--text-primary)]"
                            }`}
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {!isCartPage && (
                        <div className="hidden md:flex items-center gap-2">
                            {searchOpen ? (
                                <div className="flex items-center gap-2 border border-[var(--border)] rounded-xl px-3 py-1.5 bg-[var(--surface)] focus-within:border-[var(--brand)] transition-colors">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        className="text-[var(--text-muted)] flex-shrink-0"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21l-4.35-4.35" />
                                    </svg>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={query}
                                        onChange={(e) =>
                                            setQuery(e.target.value)
                                        }
                                        placeholder="Search products..."
                                        className="text-sm bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] w-40"
                                    />
                                    <button
                                        onClick={() => {
                                            setSearchOpen(false);
                                            setQuery("");
                                        }}
                                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                    >
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <line
                                                x1="18"
                                                y1="6"
                                                x2="6"
                                                y2="18"
                                            />
                                            <line
                                                x1="6"
                                                y1="6"
                                                x2="18"
                                                y2="18"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="M21 21l-4.35-4.35" />
                                    </svg>
                                    Search
                                </button>
                            )}
                        </div>
                    )}
                    <button
                        onClick={toggle}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
                        title={dark ? "Light mode" : "Dark mode"}
                    >
                        {dark ? (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line
                                    x1="18.36"
                                    y1="18.36"
                                    x2="19.78"
                                    y2="19.78"
                                />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line
                                    x1="4.22"
                                    y1="19.78"
                                    x2="5.64"
                                    y2="18.36"
                                />
                                <line
                                    x1="18.36"
                                    y1="5.64"
                                    x2="19.78"
                                    y2="4.22"
                                />
                            </svg>
                        ) : (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        )}
                    </button>
                    <Cart />

                    <button
                        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-secondary)]"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        {menuOpen ? (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        ) : (
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Menu mobile expandido */}
            {menuOpen && (
                <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 py-4 flex flex-col gap-4 text-sm text-[var(--text-secondary)]">
                    {navLinks.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            className={`transition-colors px-3 py-2 rounded-lg ${
                                pathname === href
                                    ? "text-[var(--brand)] font-semibold bg-[var(--surface-2)]"
                                    : "hover:text-[var(--text-primary)]"
                            }`}
                        >
                            {label}
                        </a>
                    ))}
                    {!isCartPage && (
                        <div className="flex items-center gap-2 border border-[var(--border)] rounded-xl px-3 py-2 focus-within:border-[var(--brand)] transition-colors">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-[var(--text-muted)]"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search products..."
                                className="text-sm bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)] w-full"
                            />
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
