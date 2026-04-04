import ProductCard from "@/components/product/ProductCard";
import Page from "@/components/template/Page";
import { fetchProducts } from "@/data/services/ProductService";

export default async function Home() {
    const products = await fetchProducts();

    return (
        <Page>
            {/* Hero banner */}
            <div className="rounded-2xl bg-[var(--text-primary)] text-white px-5 sm:px-10 py-7 sm:py-12 mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between overflow-hidden relative gap-5">
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
                        className="text-3xl sm:text-4xl font-bold leading-tight max-w-sm"
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
                <div className="flex flex-row flex-wrap gap-2 sm:gap-4 relative z-10">
                    {[
                        { label: "Produtos", value: "500+" },
                        { label: "Clientes", value: "12k+" },
                        { label: "Avaliação", value: "4.9★" },
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

            {/* Products */}
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
                <div className="grid grid-cols-2 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </Page>
    );
}
