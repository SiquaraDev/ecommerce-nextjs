export default interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    thumbnail: string;
    category: string;
    rating: number;
    onSale?: boolean;
}
