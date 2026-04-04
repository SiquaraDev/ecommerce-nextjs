import { fetchProducts } from "@/data/services/ProductService";
import OffersContent from "@/components/product/OffersContent";

export default async function OffersPage() {
    const products = await fetchProducts();
    return <OffersContent products={products} />;
}
