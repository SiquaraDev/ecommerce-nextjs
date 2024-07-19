"use client";
import { createContext, useEffect, useState } from "react";
import Product from "../model/Product";
import CartItem from "../model/CartItem";
import useLocalStorage from "../hooks/useLocalStorage";

interface CartContextProps {
    items: CartItem[];
    itemsQuantity: number;
    add: (item: Product) => void;
    remove: (item: Product) => void;
    clear: () => void;
}

const CartContext = createContext<CartContextProps>({} as any);

export function CartProvider(props: any) {
    const [items, setItems] = useState<CartItem[]>([]);
    const { set, get } = useLocalStorage();

    useEffect(() => {
        const cart = get("cart") as CartItem[];
        if (cart) {
            setItems(cart);
        }
    }, [get]);

    function add(product: Product) {
        const i = items.findIndex((i) => i.product.id === product.id);

        if (i === -1) {
            modifyItems([...items, { product, quantity: 1 }]);
        } else {
            const newItems = [...items];
            newItems[i].quantity++;
            modifyItems(newItems);
        }
    }

    function remove(item: Product) {
        const newItems = items
            .map((i) => {
                if (i.product.id === item.id) {
                    i.quantity--;
                }
                return i;
            })
            .filter((i) => i.quantity > 0);
        modifyItems(newItems);
    }

    function clear() {
        modifyItems([]);
    }

    function modifyItems(newItems: CartItem[]) {
        setItems(newItems);
        set("cart", newItems);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                add,
                remove,
                clear,
                get itemsQuantity() {
                    return items.reduce(
                        (total, item) => total + item.quantity,
                        0
                    );
                },
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;
