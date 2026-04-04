"use client";
import Header from "@/components/template/Header";
import Page from "@/components/template/Page";
import ProductCard from "@/components/product/ProductCard";
import Product from "@/data/model/Product";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/data/contexts/SearchContext";

export default function CategoryContent({ products }: { products: Product[] }) {
    const { query } = useSearch();

    const filtered = query.trim()
        ? products.filter((p) =>
              p.title.toLowerCase().includes(query.toLowerCase()),
          )
        : products;

    const grouped = filtered.reduce<Record<string, Product[]>>((acc, p) => {
        if (!acc[p.category]) acc[p.category] = [];
        acc[p.category].push(p);
        return acc;
    }, {});

    const categories = Object.keys(grouped).sort();
    const [active, setActive] = useState(categories[0]);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-30% 0px -60% 0px" },
        );
        categories.forEach((cat) => {
            const el = sectionRefs.current[cat];
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    function scrollTo(category: string) {
        const el = sectionRefs.current[category];
        if (el) {
            const offset = 130;
            const top =
                el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header normal */}
            <Header />

            {/* Nav de categorias sticky logo abaixo do header */}
            <div className="sticky top-16 z-40 bg-[var(--surface)] border-b border-[var(--border)] shadow-sm">
                <div className="w-full max-w-[1200px] mx-auto px-3 sm:px-6 flex gap-2 overflow-x-auto py-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => scrollTo(cat)}
                            className={`flex-shrink-0 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full border transition-all duration-200 capitalize whitespace-nowrap
                                ${
                                    active === cat
                                        ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                                        : "text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
                                }`}
                        >
                            {cat.replace(/-/g, " ")}
                        </button>
                    ))}
                </div>
            </div>

            {/* Conteúdo sem o Header do Page */}
            <Page hideHeader>
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
                        Categorias
                    </h1>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">
                        {categories.length} categorias disponíveis
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {categories.map((category) => (
                        <section
                            key={category}
                            id={category}
                            ref={(el) => {
                                sectionRefs.current[category] = el;
                            }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-lg font-semibold text-[var(--text-primary)] capitalize">
                                    {category.replace(/-/g, " ")}
                                </h2>
                                <span className="text-xs font-medium text-[var(--text-muted)] bg-[var(--surface-2)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                                    {grouped[category].length} produtos
                                </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6">
                                {grouped[category].map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </Page>
        </div>
    );
}
