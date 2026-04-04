"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { useSearch } from "@/data/contexts/SearchContext";
import Product from "@/data/model/Product";
import ProductCard from "./ProductCard";

type SortOption = "none" | "az" | "za" | "asc" | "desc";

const options: { value: SortOption; label: string }[] = [
    { value: "none", label: "Ordenar por" },
    { value: "az", label: "A-Z" },
    { value: "za", label: "Z-A" },
    { value: "asc", label: "Menor preço" },
    { value: "desc", label: "Maior preço" },
];

export default function ProductSort({ products }: { products: Product[] }) {
    const [sort, setSort] = useState<SortOption>("none");
    const [open, setOpen] = useState(false);
    const { query } = useSearch();

    const ref = useRef<HTMLDivElement>(null);

    // Fecha ao clicar fora
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const sorted = useMemo(() => {
        let result = query.trim()
            ? products.filter((p) =>
                  p.title.toLowerCase().includes(query.toLowerCase()),
              )
            : products;

        if (sort === "none") return result;
        return [...result].sort((a, b) => {
            if (sort === "az") return a.title.localeCompare(b.title);
            if (sort === "za") return b.title.localeCompare(a.title);
            if (sort === "asc") return a.price - b.price;
            if (sort === "desc") return b.price - a.price;
            return 0;
        });
    }, [products, sort, query]);

    const selected = options.find((o) => o.value === sort)!;

    return (
        <div>
            <div className="flex items-center justify-between mb-6 gap-4">
                <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] truncate">
                        Todos os produtos
                    </h2>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">
                        {sorted.length}{" "}
                        {query
                            ? "resultados encontrados"
                            : "produtos disponíveis"}
                    </p>
                </div>

                {/* Dropdown customizado */}
                <div ref={ref} className="relative flex-shrink-0">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-2 hover:border-[var(--brand)] transition-colors w-36 justify-between"
                    >
                        {selected.label}
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-44 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-lg shadow-black/5 overflow-hidden z-50">
                            {options.map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => {
                                        setSort(opt.value);
                                        setOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--brand)]
                                        ${
                                            sort === opt.value
                                                ? "text-[var(--brand)] font-semibold bg-[var(--surface-2)]"
                                                : "text-[var(--text-secondary)]"
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6">
                {sorted.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
