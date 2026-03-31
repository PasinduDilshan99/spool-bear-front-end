import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "@/components/common-components/navBar/NavBar";
import Footer from "@/components/common-components/footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { DEFAULT_PAGE_TITLE } from "@/utils/headerTitle";
import { Faculty_Glyphic } from "next/font/google";
import { CurrencyProvider } from "@/context/CurrencyContext";

const facultyGlyphic = Faculty_Glyphic({
  subsets: ["latin"],
  weight: ["400"], // adjust if needed
  variable: "--font-faculty",
});

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
            <CurrencyProvider>
              <NavBar />
              {children}
              <Footer />
            </CurrencyProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
