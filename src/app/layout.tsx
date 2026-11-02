import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mastone Investments Ltd | Equipment & Power Solutions in Zambia",
  description:
    "Mastone Investments Ltd supplies SUNWARD construction and mining machinery, YTO tractors, WEICHAI and SINOTRUK trucks, generators and premium engine oils across Zambia, backed by parts and after-sales support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
    >
      <body className="min-h-full overflow-x-clip">
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster position="top-center" theme="light" richColors />
      </body>
    </html>
  );
}
