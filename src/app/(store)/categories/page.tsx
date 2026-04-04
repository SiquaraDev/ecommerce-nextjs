import Page from "@/components/template/Page";
import { fetchProducts } from "@/data/services/ProductService";
import ProductCard from "@/components/product/ProductCard";

export default async function CategoriesPage() {
    const products = await fetchProducts();

    // Agrupa produtos por categoria
    const grouped = products.reduce<Record<string, typeof products>>(
        (acc, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
        },
        {},
    );

    const categories = Object.keys(grouped).sort();

    return (
        <Page>
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
                    <section key={category}>
                        {/* Cabeçalho da categoria */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-semibold text-[var(--text-primary)] capitalize">
                                    {category.replace(/-/g, " ")}
                                </h2>
                                <span className="text-xs font-medium text-[var(--text-muted)] bg-[var(--surface-2)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                                    {grouped[category].length} produtos
                                </span>
                            </div>
                        </div>

                        {/* Grid de produtos */}
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
    );
}
