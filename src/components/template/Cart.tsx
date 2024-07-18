import Link from "next/link";
import Logo from "./Logo";
import { IconShoppingCart } from "@tabler/icons-react";

export default function Cart() {
    return (
        <Link href="/cart">
            <div className="flex relative">
                <IconShoppingCart size={32} stroke={1} />
                <div className="absolute w-6 h-6 bg-red-500 rounded-full -top-2.5 -right-2.5 flex justify-center items-center text-xs">
                    99
                </div>
            </div>
        </Link>
    );
}
