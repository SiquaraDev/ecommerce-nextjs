import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "../../globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-body",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["500", "700"],
    variable: "--font-display",
});

export const metadata: Metadata = {
    title: "Siquara Store",
    description: "E-commerce",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var saved = localStorage.getItem('theme');
                                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                                    if (saved === 'dark' || (!saved && prefersDark)) {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch(e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className={`${dmSans.variable} ${playfair.variable}`}>
                {children}
            </body>
        </html>
    );
}
