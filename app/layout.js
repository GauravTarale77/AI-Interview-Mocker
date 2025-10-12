import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const merriweather = Merriweather({ subsets: ["latin"] });

export const metadata = {
  title: "AI Interview Mocker by GT",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={merriweather.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
