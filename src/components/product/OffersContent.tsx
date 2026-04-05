"use client";
import { useDeals } from "@/data/contexts/DealsContext";
import Product from "@/data/model/Product";
import ProductSort from "./ProductSort";
import Page from "@/components/template/Page";

export default function OffersContent({ products }: { products: Product[] }) {
    const { dealIds } = useDeals();
    const deals = products.filter((p) => dealIds.has(p.id));

    return (
        <Page>
            {/* Banner */}
            <div className="rounded-2xl bg-[#1a1714] text-white px-5 sm:px-10 py-7 sm:py-12 mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between overflow-hidden relative gap-5">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 70% 50%, #e8572a 0%, transparent 60%)",
                    }}
                />
                <div className="relative z-10">
                    <p className="text-[var(--brand)] text-sm font-medium mb-2 uppercase tracking-widest">
                        Limited time
                    </p>
                    <h1
                        className="text-3xl sm:text-4xl font-bold leading-tight max-w-sm"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Daily deals
                    </h1>
                    <p className="text-white/60 text-sm mt-2 max-w-xs leading-relaxed">
                        Selected products at the best prices. Don&apos;t miss
                        out!
                    </p>
                </div>
                <div className="flex flex-row flex-wrap gap-2 sm:gap-4 relative z-10">
                    {[
                        { label: "On sale", value: `${deals.length}` },
                        { label: "Avg. discount", value: "30%" },
                        { label: "Shipping", value: "Free" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center bg-white/10 rounded-xl px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm"
                        >
                            <p className="text-xl sm:text-2xl font-bold">
                                {stat.value}
                            </p>
                            <p className="text-white/60 text-xs mt-0.5">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <ProductSort products={deals} title="Daily deals" />
        </Page>
    );
}
