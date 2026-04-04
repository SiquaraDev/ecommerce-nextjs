import { fetchDeals } from "@/data/services/ProductService";
import Providers from "@/components/template/Providers";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const deals = await fetchDeals();
    const dealIds = deals.map((d) => d.id);
    return <Providers dealIds={dealIds}>{children}</Providers>;
}
