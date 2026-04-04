import ProductCard from "@/components/product/ProductCard";
import Page from "@/components/template/Page";
import { fetchProducts } from "@/data/services/productService";

export default async function Home() {
    const products = await fetchProducts();

    return (
        <Page>
            <div className="rounded-2xl bg-[var(--text-primary)] text-white px-10 py-12 mb-10 flex items-center justify-between overflow-hidden relative">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 70% 50%, #e8572a 0%, transparent 60%)",
                    }}
                />
                <div className="relative z-10">
                    <p className="text-[var(--brand)] text-sm font-medium mb-2 uppercase tracking-widest">
                        Novidades
                    </p>
                    <h1
                        className="text-4xl font-bold leading-tight max-w-sm"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Tecnologia que transforma
                    </h1>
                    <p className="text-white/60 text-sm mt-2 max-w-xs leading-relaxed">
                        Os melhores produtos com entrega rápida e preço justo.
                    </p>
                    <button className="mt-6 bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
                        Explorar agora
                    </button>
                </div>
                <div className="hidden md:flex gap-4 relative z-10">
                    {[
                        { label: "Produtos", value: "500+" },
                        { label: "Clientes", value: "12k+" },
                        { label: "Avaliação", value: "4.9★" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center bg-white/10 rounded-xl px-6 py-4 backdrop-blur-sm"
                        >
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-white/60 text-xs mt-0.5">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                            Em destaque
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mt-0.5">
                            {products.length} produtos disponíveis
                        </p>
                    </div>
                    <button className="text-sm text-[var(--brand)] font-medium hover:underline">
                        Ver todos →
                    </button>
                </div>
                <div className="flex gap-6 flex-wrap justify-start">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </Page>
    );
}
