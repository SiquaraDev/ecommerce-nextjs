import { fetchProducts } from "@/data/services/ProductService";
import CategoryContent from "@/components/product/CategoryContent";

export default async function CategoriesPage() {
    const products = await fetchProducts();
    return <CategoryContent products={products} />;
}
