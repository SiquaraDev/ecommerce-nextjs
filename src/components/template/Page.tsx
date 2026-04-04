"use client";
import Header from "./Header";

export interface PageProps {
    children: React.ReactNode;
    className?: string;
    hideHeader?: boolean;
}

export default function Page(props: PageProps) {
    return (
        <div className="flex flex-col min-h-screen">
            {!props.hideHeader && <Header />}
            <main
                className={`w-full max-w-[1200px] mx-auto flex-1 px-3 sm:px-6 lg:px-8 py-6 sm:py-10 ${props.className ?? ""}`}
            >
                {props.children}
            </main>
        </div>
    );
}
