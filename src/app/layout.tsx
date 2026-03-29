import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/components/common-components/footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { DEFAULT_PAGE_TITLE } from "@/utils/headerTitle";

export const metadata: Metadata = {
  title: {
    default: DEFAULT_PAGE_TITLE,
    template: `%s`,
  },
  description: "3d Printing company in sri lanka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AuthProvider>
          <CartProvider>
            <NavBar />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
